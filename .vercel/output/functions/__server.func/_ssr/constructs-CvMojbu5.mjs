import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as DesignBar, l as useStudio, n as Button, o as analyzeDesign, r as Card, s as cn, t as AppShell } from "./card-CNsq0p40.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/constructs-CvMojbu5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SequencePage() {
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
	async function copy() {
		try {
			await navigator.clipboard.writeText(`>${r.construct.name}|${r.linker.name}|${r.aa}aa\n${r.seq}`);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1200);
		} catch {}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl",
			children: "Assembled ORF"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: "UniProt slices joined with the live linker + TEV + 6×His. Length and composition are computed."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mt-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesignBar, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 flex flex-wrap gap-2",
			children: r.fusion.blocks.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: cn("rounded-full px-3 py-1 font-mono text-[11px]", b.kind === "domain" && "bg-elevated text-fg", b.kind === "linker" && "bg-accent/20 text-accent", b.kind === "tag" && "border border-border text-muted"),
				children: [
					b.id,
					" ",
					b.seq.length
				]
			}, b.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 grid gap-3 md:grid-cols-3",
			children: r.domains.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted",
					children: [
						d.uniprot,
						" ",
						d.range
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-lg",
					children: d.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 font-mono text-xs tabular-nums text-muted",
					children: [d.seq.length, " aa"]
				})
			] }, d.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted",
					children: [
						"FASTA · ",
						r.aa,
						" residues"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "outline",
					onClick: () => void copy(),
					children: copied ? "Copied" : "Copy FASTA"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "mt-3 max-h-80 overflow-auto whitespace-pre-wrap break-all font-mono text-[11px] leading-relaxed text-fg",
				children: r.seq
			})]
		})
	] });
}
//#endregion
export { SequencePage as component };
