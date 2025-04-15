import { defineComponent as x, computed as f, createElementBlock as y, openBlock as g, createElementVNode as b, Fragment as M, renderList as V, ref as w, watch as T, nextTick as B, createCommentVNode as N, createVNode as $ } from "vue";
function v(e) {
  return parseInt(e.toString(), 10);
}
function C(e, t, n) {
  return e.x === t.x && e.y === t.y || t.x === n.x && t.y === n.y ? !0 : v(e.x + n.x) === v(2 * t.x) && v(e.y + n.y) === v(2 * t.y);
}
function D(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function k(e, t, n) {
  const o = { x: e.x - t.x, y: e.y - t.y }, r = Math.sqrt(o.x * o.x + o.y * o.y);
  if (r === 0)
    return { ...t };
  const s = { x: o.x / r, y: o.y / r };
  return {
    x: t.x + s.x * n,
    y: t.y + s.y * n
  };
}
function E(e, { minX: t, minY: n, maxX: o, maxY: r }, { max: s, min: a }) {
  const u = e.map((h) => typeof h == "number" ? h : h.value), l = Math.min(...u, a) - 1e-3, c = Math.max(...u, s) + 1e-3, i = (o - t) / (u.length - 1), d = (r - n) / (c - l), m = Number.isFinite(d) ? d : 0;
  return u.map((h, p) => ({
    x: p * i + t,
    y: r - (h - l) * m + // Need these small adjustments to prevent floating point issues
    // causing the path to not be perfectly horizontal when all values are equal.
    // Also ensures the path starts and ends exactly at the boundaries.
    (p === u.length - 1 ? -1e-5 : 0) + (p === 0 ? 1e-5 : 0)
    // Original logic - might have issues with perfectly flat lines
    // maxY -
    // (value - minValue) * gridY +
    // +(index === arr.length - 1) * 0.00001 -
    // +(index === 0) * 0.00001
  }));
}
function I(e, t) {
  if (e.length < 2)
    return "";
  const n = [...e], o = n.shift();
  return `M${o.x} ${o.y}` + n.map((r, s) => {
    const a = n[s + 1], u = n[s - 1] || o, l = a && C(u, r, a);
    if (!a || l)
      return `L${r.x} ${r.y}`;
    const c = Math.min(D(u, r), D(a, r)), i = Math.min(t, c / 2), d = k(u, r, i), m = k(a, r, i);
    return `L${d.x} ${d.y}S${r.x} ${r.y} ${m.x} ${m.y}`;
  }).join("");
}
const S = ["id", "x1", "y1", "x2", "y2"], L = ["offset", "stop-color"], G = /* @__PURE__ */ x({
  __name: "TrendGradient",
  props: {
    gradient: { default: () => ["#000"] },
    gradientDirection: { default: "top" },
    id: {}
  },
  setup(e) {
    const t = e, n = f(() => [...t.gradient].reverse()), o = f(() => +(t.gradientDirection === "left")), r = f(() => +(t.gradientDirection === "top")), s = f(() => +(t.gradientDirection === "right")), a = f(() => +(t.gradientDirection === "bottom")), u = (l) => {
      const c = n.value.length - 1 || 1;
      return l / c;
    };
    return (l, c) => (g(), y("defs", null, [
      b("linearGradient", {
        id: t.id,
        x1: o.value,
        y1: r.value,
        x2: s.value,
        y2: a.value
      }, [
        (g(!0), y(M, null, V(n.value, (i, d) => (g(), y("stop", {
          key: d,
          offset: u(d),
          "stop-color": i
        }, null, 8, L))), 128))
      ], 8, S)
    ]));
  }
}), P = ["d", "stroke"], F = /* @__PURE__ */ x({
  __name: "TrendPath",
  props: {
    data: {},
    boundary: {},
    id: {},
    smooth: { type: Boolean, default: !1 },
    radius: { default: 10 },
    max: { default: -1 / 0 },
    min: { default: 1 / 0 }
  },
  setup(e) {
    const t = e, n = f(() => {
      if (!t.data || t.data.length < 2)
        return "";
      const r = E(t.data, t.boundary, { max: t.max, min: t.min });
      return I(r, t.smooth ? t.radius : 0);
    }), o = f(() => `url(#${t.id})`);
    return (r, s) => (g(), y("path", {
      d: n.value,
      fill: "none",
      stroke: o.value
    }, null, 8, P));
  }
}), H = ["width", "height", "viewBox"], _ = /* @__PURE__ */ x({
  __name: "VueTrend",
  props: {
    data: {},
    autoDraw: { type: Boolean, default: !1 },
    autoDrawDuration: { default: 2e3 },
    autoDrawEasing: { default: "ease" },
    gradient: { default: () => ["#000"] },
    gradientDirection: { default: "top" },
    max: { default: -1 / 0 },
    min: { default: 1 / 0 },
    height: { default: "100%" },
    width: { default: "100%" },
    viewHeight: { default: 75 },
    viewWidth: { default: 300 },
    padding: { default: 8 },
    radius: { default: 10 },
    smooth: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, n = w(null), o = f(() => `vue-trend-${Math.random().toString(36).substring(7)}`), r = f(() => ({
      minX: t.padding,
      minY: t.padding,
      maxX: t.viewWidth - t.padding,
      maxY: t.viewHeight - t.padding
    })), s = w(0);
    return T(
      () => t.data,
      async (a, u) => {
        var l, c;
        if (t.autoDraw && JSON.stringify(a) !== JSON.stringify(u)) {
          if (await B(), typeof window > "u" || !((l = n.value) != null && l.$el))
            return;
          const i = n.value.$el, d = i.getTotalLength();
          isNaN(d) ? console.warn("VueTrend: Could not get path length for autoDraw animation.") : (i.style.transition = "none", i.style.strokeDasharray = `${d} ${d}`, i.style.strokeDashoffset = Math.abs(d - (s.value || 0)).toString(), i.getBoundingClientRect(), i.style.transition = `stroke-dashoffset ${t.autoDrawDuration}ms ${t.autoDrawEasing}`, i.style.strokeDashoffset = "0", s.value = d);
        } else if (!t.autoDraw && ((c = n.value) != null && c.$el)) {
          const i = n.value.$el;
          i.style.transition = "", i.style.strokeDasharray = "", i.style.strokeDashoffset = "", s.value = 0;
        }
      },
      {
        immediate: !0,
        // Run the watcher immediately on component mount
        deep: !0
        // Watch for changes within the data array/objects
      }
    ), (a, u) => a.data && a.data.length >= 2 ? (g(), y("svg", {
      key: 0,
      width: a.width,
      height: a.height,
      viewBox: `0 0 ${a.viewWidth} ${a.viewHeight}`
    }, [
      $(G, {
        id: o.value,
        gradient: a.gradient,
        "gradient-direction": a.gradientDirection
      }, null, 8, ["id", "gradient", "gradient-direction"]),
      $(F, {
        ref_key: "pathRef",
        ref: n,
        data: a.data,
        boundary: r.value,
        smooth: a.smooth,
        radius: a.radius,
        id: o.value,
        max: a.max,
        min: a.min
      }, null, 8, ["data", "boundary", "smooth", "radius", "id", "max", "min"])
    ], 8, H)) : N("", !0);
  }
}), O = (e) => {
  e.component("VueTrend", _);
}, R = _;
R.install = O;
export {
  R as default
};
//# sourceMappingURL=vue3-trend.js.map
