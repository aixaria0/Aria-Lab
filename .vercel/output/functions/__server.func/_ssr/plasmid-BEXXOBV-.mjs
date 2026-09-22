import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as DesignBar, l as useStudio, o as analyzeDesign, r as Card, s as cn, t as AppShell } from "./card-CNsq0p40.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/plasmid-BEXXOBV-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function polar(cx, cy, r, deg) {
	const a = (deg - 90) * Math.PI / 180;
	return {
		x: Math.round((cx + r * Math.cos(a)) * 1e3) / 1e3,
		y: Math.round((cy + r * Math.sin(a)) * 1e3) / 1e3
	};
}
function arcPath(start, end, total, r, cx, cy) {
	const a0 = start / total * 360;
	const a1 = end / total * 360;
	const sweep = Math.max(.4, a1 - a0);
	const p0 = polar(cx, cy, r, a0);
	const p1 = polar(cx, cy, r, a0 + sweep);
	const large = sweep > 180 ? 1 : 0;
	return `M ${p0.x} ${p0.y} A ${r} ${r} 0 ${large} 1 ${p1.x} ${p1.y}`;
}
var TONES = {
	origin: "var(--color-domain-b)",
	marker: "var(--color-domain-c)",
	coding: "var(--color-accent)",
	regulatory: "var(--color-domain-a)",
	cloning: "var(--color-muted)"
};
function PlasmidMap({ insertBp, label }) {
	const plasmid = (0, import_react.useMemo)(() => {
		const insertStart = 902;
		const insertEnd = insertStart + insertBp - 1;
		const termStart = insertEnd + 1;
		const termEnd = termStart + 99;
		const ampStart = termEnd + 1;
		const ampEnd = ampStart + 448;
		return {
			total: ampEnd,
			features: [
				{
					id: "ori",
					name: "pUC ori",
					start: 1,
					end: 799,
					type: "origin"
				},
				{
					id: "mcs",
					name: "MCS",
					start: 800,
					end: 850,
					type: "cloning"
				},
				{
					id: "t7",
					name: "T7",
					start: 851,
					end: 901,
					type: "regulatory"
				},
				{
					id: "insert",
					name: `${label} CDS`,
					start: insertStart,
					end: insertEnd,
					type: "coding"
				},
				{
					id: "term",
					name: "Terminator",
					start: termStart,
					end: termEnd,
					type: "regulatory"
				},
				{
					id: "amp",
					name: "AmpR",
					start: ampStart,
					end: ampEnd,
					type: "marker"
				}
			]
		};
	}, [insertBp, label]);
	const [active, setActive] = (0, import_react.useState)("insert");
	const cx = 200;
	const cy = 200;
	const r = 132;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-[var(--radius-lg)] border border-border bg-surface p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-wide text-muted uppercase",
						children: "pARIA"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-xs tabular-nums text-muted",
						children: [plasmid.total.toLocaleString(), " bp"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					viewBox: "0 0 400 400",
					className: "mx-auto max-h-[420px] w-full",
					role: "img",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx,
							cy,
							r,
							fill: "none",
							stroke: "var(--color-border)",
							strokeWidth: "18"
						}),
						plasmid.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: arcPath(f.start, f.end, plasmid.total, r, cx, cy),
							fill: "none",
							stroke: TONES[f.type],
							strokeWidth: active === f.id ? 22 : 16,
							className: "cursor-pointer",
							onClick: () => setActive(f.id)
						}, f.id)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx,
							cy,
							r: "86",
							fill: "var(--color-bg)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
							x: cx,
							y: 194,
							textAnchor: "middle",
							fill: "var(--color-fg)",
							fontSize: "14",
							children: "pARIA"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
							x: cx,
							y: 214,
							textAnchor: "middle",
							fill: "var(--color-muted)",
							fontSize: "11",
							children: [plasmid.total, " bp"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative mt-4 h-8 overflow-hidden rounded-full bg-elevated",
					children: plasmid.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setActive(f.id),
						className: "absolute top-0 h-full",
						style: {
							left: `${(f.start - 1) / plasmid.total * 100}%`,
							width: `${(f.end - f.start + 1) / plasmid.total * 100}%`,
							background: TONES[f.type],
							opacity: active === f.id ? 1 : .7
						}
					}, f.id))
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: plasmid.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setActive(f.id),
				className: cn("w-full rounded-[var(--radius-md)] border p-3 text-start", active === f.id ? "border-accent/50 bg-elevated" : "border-border bg-surface"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm",
						children: f.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-[11px] tabular-nums text-muted",
						children: [
							f.start,
							"–",
							f.end
						]
					})]
				})
			}, f.id))
		})]
	});
}
function PlasmidPage() {
	const constructId = useStudio((s) => s.constructId);
	const linkerId = useStudio((s) => s.linkerId);
	const host = useStudio((s) => s.host);
	const pH = useStudio((s) => s.pH);
	const customSeq = useStudio((s) => s.customSeq);
	const r = (0, import_react.useMemo)(() => analyzeDesign(constructId, linkerId, host, pH, customSeq), [
		constructId,
		linkerId,
		host,
		pH,
		customSeq
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl",
			children: "Map"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 text-sm text-muted",
			children: [
				"Insert length is the optimized CDS (",
				r.bp,
				" bp), not a placeholder."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mt-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesignBar, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlasmidMap, {
				insertBp: r.bp,
				label: r.construct.name
			})
		})
	] });
}
//#endregion
export { PlasmidPage as component };
