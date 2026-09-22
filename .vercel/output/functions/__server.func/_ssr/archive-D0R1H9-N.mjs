import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as DesignBar, l as useStudio, o as analyzeDesign, r as Card, s as cn, t as AppShell } from "./card-CNsq0p40.mjs";
import { n as complementScore, r as molProps, t as MOLECULES } from "./molecule-JhD7UwoI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/archive-D0R1H9-N.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LigandPage() {
	const constructId = useStudio((s) => s.constructId);
	const linkerId = useStudio((s) => s.linkerId);
	const host = useStudio((s) => s.host);
	const pH = useStudio((s) => s.pH);
	const customSeq = useStudio((s) => s.customSeq);
	const molId = useStudio((s) => s.molId);
	const setMol = useStudio((s) => s.setMol);
	const r = (0, import_react.useMemo)(() => analyzeDesign(constructId, linkerId, host, pH, customSeq), [
		constructId,
		linkerId,
		host,
		pH,
		customSeq
	]);
	const rows = (0, import_react.useMemo)(() => {
		return MOLECULES.map((m) => {
			const p = molProps(m.smiles);
			return {
				m,
				p,
				score: complementScore(p, r.gravy, r.pi)
			};
		}).sort((a, b) => b.score - a.score);
	}, [r.gravy, r.pi]);
	const selected = rows.find((x) => x.m.id === molId) ?? rows[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl",
			children: "Ligand complement"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: "Lipinski / QED-style scoring against the live protein GRAVY and pI. Not a docking run."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mt-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesignBar, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4",
			children: rows.map(({ m, p, score }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setMol(m.id),
				className: cn("rounded-[var(--radius-md)] border p-3 text-start", molId === m.id ? "border-accent/50 bg-elevated" : "border-border bg-surface"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium",
							children: m.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs tabular-nums text-accent",
							children: score.toFixed(1)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[11px] text-muted",
						children: m.note
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 font-mono text-[10px] text-subtle",
						children: [
							"MW ",
							p.mw.toFixed(0),
							" · logP ",
							p.logP.toFixed(2),
							" · Lip ",
							p.lipinski
						]
					})
				]
			}, m.id))
		}),
		selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl",
					children: selected.m.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 break-all font-mono text-[11px] text-muted",
					children: selected.m.smiles
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4",
					children: [
						["MW", selected.p.mw.toFixed(1)],
						["logP", selected.p.logP.toFixed(2)],
						["HBD / HBA", `${selected.p.hbd} / ${selected.p.hba}`],
						["TPSA", selected.p.tpsa.toFixed(0)],
						["QED-like", selected.p.qed.toFixed(3)],
						["Lipinski fails", String(selected.p.lipinski)],
						["Complement", selected.score.toFixed(1)],
						["vs GRAVY", r.gravy.toFixed(3)]
					].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] text-muted uppercase",
						children: k
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-sm tabular-nums",
						children: v
					})] }, k))
				})
			]
		}) : null
	] });
}
//#endregion
export { LigandPage as component };
