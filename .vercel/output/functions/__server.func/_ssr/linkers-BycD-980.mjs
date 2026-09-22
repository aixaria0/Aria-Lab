import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as LINKERS, i as DesignBar, l as useStudio, n as Button, o as analyzeDesign, r as Card, t as AppShell } from "./card-CNsq0p40.mjs";
import { n as GcChart } from "./spark-DVZ2kOQx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/linkers-BycD-980.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CodonPage() {
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
	const [copied, setCopied] = (0, import_react.useState)(false);
	const linkerRank = (0, import_react.useMemo)(() => {
		return LINKERS.map((l) => {
			const x = analyzeDesign(constructId, l.id, host, pH, customSeq);
			return {
				id: l.id,
				name: l.name,
				cai: x.cai,
				vein: x.vein.total,
				ii: x.instability
			};
		}).sort((a, b) => b.vein - a.vein);
	}, [
		constructId,
		host,
		pH,
		customSeq
	]);
	async function copy() {
		try {
			await navigator.clipboard.writeText(r.dna);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1200);
		} catch {}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl",
			children: "Codon engine"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: "Sharp–Li CAI, GC sliding window, rare-codon runs, restriction-site rewrite. Host retunes every codon."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mt-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesignBar, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 grid gap-3 sm:grid-cols-4",
			children: [
				["CAI", r.cai.toFixed(3)],
				["GC", `${(r.gc * 100).toFixed(1)}%`],
				["Rare runs", String(r.rare.length)],
				["Sites rewritten", r.avoided.length ? r.avoided.join(", ") : "none"]
			].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] text-muted uppercase",
					children: k
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-mono text-sm tabular-nums",
					children: v
				})]
			}, k))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: "GC along CDS (36 bp window)"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GcChart, { data: r.gcTrack })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: "Linker sweep — same construct, this host, ranked by VEIN"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-left text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "Linker"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "VEIN"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "CAI"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "II"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "font-mono tabular-nums",
						children: linkerRank.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: row.id === linkerId ? "text-accent" : "text-fg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1.5",
									children: row.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: row.vein.toFixed(1) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: row.cai.toFixed(3) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: row.ii.toFixed(1) })
							]
						}, row.id))
					})]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: "Optimized CDS"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "outline",
					onClick: () => void copy(),
					children: copied ? "Copied" : "Copy DNA"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "mt-3 max-h-64 overflow-auto whitespace-pre-wrap break-all font-mono text-[11px] leading-relaxed",
				children: r.dna
			})]
		})
	] });
}
//#endregion
export { CodonPage as component };
