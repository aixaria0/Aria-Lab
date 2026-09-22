import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Area, c as ResponsiveContainer, i as XAxis, l as Tooltip, n as LineChart, o as Line, r as YAxis, s as CartesianGrid, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/spark-DVZ2kOQx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HydroChart({ data }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setReady(true), []);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 rounded-[var(--radius-md)] bg-elevated" });
	const sampled = data.filter((_, idx) => idx % Math.max(1, Math.floor(data.length / 180)) === 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-40 w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
			data: sampled,
			margin: {
				top: 8,
				right: 8,
				left: 0,
				bottom: 0
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
					stroke: "var(--color-border)",
					vertical: false
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
					dataKey: "i",
					hide: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
					hide: true,
					domain: ["auto", "auto"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
					background: "var(--color-surface)",
					border: "1px solid var(--color-border)",
					borderRadius: 8,
					fontSize: 11,
					color: "var(--color-fg)"
				} }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
					type: "monotone",
					dataKey: "kd",
					stroke: "var(--color-accent)",
					fill: "var(--color-accent)",
					fillOpacity: .18
				})
			]
		}) })
	});
}
function ChargeChart({ data }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setReady(true), []);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 rounded-[var(--radius-md)] bg-elevated" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-40 w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
			data,
			margin: {
				top: 8,
				right: 8,
				left: 0,
				bottom: 0
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
					stroke: "var(--color-border)",
					vertical: false
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
					dataKey: "pH",
					tick: {
						fill: "var(--color-muted)",
						fontSize: 10
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
					tick: {
						fill: "var(--color-muted)",
						fontSize: 10
					},
					width: 32
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
					background: "var(--color-surface)",
					border: "1px solid var(--color-border)",
					borderRadius: 8,
					fontSize: 11,
					color: "var(--color-fg)"
				} }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
					type: "monotone",
					dataKey: "q",
					stroke: "var(--color-domain-b)",
					dot: false,
					strokeWidth: 2
				})
			]
		}) })
	});
}
function GcChart({ data }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setReady(true), []);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-36 rounded-[var(--radius-md)] bg-elevated" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-36 w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
			data,
			margin: {
				top: 8,
				right: 8,
				left: 0,
				bottom: 0
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
					stroke: "var(--color-border)",
					vertical: false
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
					dataKey: "i",
					hide: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
					domain: [.2, .8],
					hide: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
					background: "var(--color-surface)",
					border: "1px solid var(--color-border)",
					borderRadius: 8,
					fontSize: 11,
					color: "var(--color-fg)"
				} }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
					type: "monotone",
					dataKey: "gc",
					stroke: "var(--color-domain-a)",
					fill: "var(--color-domain-a)",
					fillOpacity: .2
				})
			]
		}) })
	});
}
//#endregion
export { GcChart as n, HydroChart as r, ChargeChart as t };
