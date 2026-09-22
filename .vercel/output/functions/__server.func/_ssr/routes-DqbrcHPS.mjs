import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as sweepVein, i as DesignBar, l as useStudio, n as Button, o as analyzeDesign, r as Card, s as cn, t as AppShell } from "./card-CNsq0p40.mjs";
import { n as complementScore, r as molProps, t as MOLECULES } from "./molecule-JhD7UwoI.mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { n as GcChart, r as HydroChart, t as ChargeChart } from "./spark-DVZ2kOQx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DqbrcHPS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SequenceTape({ blocks }) {
	const total = blocks.reduce((a, b) => a + b.seq.length, 0) || 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-4 overflow-hidden rounded-full bg-elevated",
			children: blocks.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				title: `${b.id} ${b.seq.length}`,
				className: cn("h-full", b.kind === "domain" && "bg-domain-a", b.kind === "linker" && "bg-accent", b.kind === "tag" && "bg-domain-c"),
				style: { width: `${b.seq.length / total * 100}%` }
			}, b.id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2 text-[10px] text-muted",
			children: blocks.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "font-mono",
				children: [
					b.id,
					":",
					b.seq.length
				]
			}, b.id))
		})]
	});
}
function CompBars({ data }) {
	const max = Math.max(...data.map((d) => d.f), .001);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-10 gap-1",
		children: data.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-12 w-full items-end rounded-sm bg-elevated",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full rounded-sm bg-accent",
					style: { height: `${d.f / max * 100}%` }
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-[9px] text-muted",
				children: d.aa
			})]
		}, d.aa))
	});
}
function VeinHeatmap({ rows, activeLinker, activeHost, onPick }) {
	const hosts = [
		"ecoli",
		"pichia",
		"human"
	];
	const all = rows.flatMap((r) => r.cells.map((c) => c.vein));
	const min = Math.min(...all);
	const max = Math.max(...all);
	const t = (v) => max === min ? .5 : (v - min) / (max - min);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-x-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full text-left text-[11px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "pb-2 pr-2 font-medium",
					children: "Linker"
				}), hosts.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "pb-2 px-1 font-medium",
					children: h
				}, h))]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
				className: "font-mono tabular-nums",
				children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "py-0.5 pr-2 text-muted",
					children: r.name
				}), r.cells.map((c) => {
					const on = r.linkerId === activeLinker && c.host === activeHost;
					const u = t(c.vein);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-0.5 py-0.5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => onPick(r.linkerId, c.host),
							className: cn("flex h-8 w-full items-center justify-center rounded-[6px] border text-[11px]", on ? "border-accent text-accent-fg" : "border-transparent text-fg"),
							style: { background: on ? "var(--color-accent)" : `color-mix(in oklab, var(--color-accent) ${Math.round(18 + u * 55)}%, var(--color-elevated))` },
							children: c.vein.toFixed(1)
						})
					}, c.host);
				})] }, r.linkerId))
			})]
		})
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var rankDesign = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("ed4610d69a8fe72a1ab00314e730423dd1c154268156997fae070efbf0c31669"));
function Dashboard() {
	const constructId = useStudio((s) => s.constructId);
	const linkerId = useStudio((s) => s.linkerId);
	const host = useStudio((s) => s.host);
	const pH = useStudio((s) => s.pH);
	const customSeq = useStudio((s) => s.customSeq);
	const setPh = useStudio((s) => s.setPh);
	const setCustomSeq = useStudio((s) => s.setCustomSeq);
	const setLinker = useStudio((s) => s.setLinker);
	const setHost = useStudio((s) => s.setHost);
	const molId = useStudio((s) => s.molId);
	const setMol = useStudio((s) => s.setMol);
	const r = (0, import_react.useMemo)(() => analyzeDesign(constructId, linkerId, host, pH, customSeq), [
		constructId,
		linkerId,
		host,
		pH,
		customSeq
	]);
	const heat = (0, import_react.useMemo)(() => sweepVein(constructId, customSeq), [constructId, customSeq]);
	const ligands = (0, import_react.useMemo)(() => {
		return MOLECULES.map((m) => {
			const p = molProps(m.smiles);
			return {
				m,
				p,
				score: complementScore(p, r.gravy, r.pi)
			};
		}).sort((a, b) => b.score - a.score);
	}, [r.gravy, r.pi]);
	const [note, setNote] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [draft, setDraft] = (0, import_react.useState)(customSeq);
	async function rank() {
		setBusy(true);
		setNote("");
		const out = await rankDesign({ data: { summary: JSON.stringify({
			construct: r.custom ? "custom" : r.construct.name,
			linker: r.linker.name,
			host,
			pH,
			vein: r.vein,
			kDa: +r.kDa.toFixed(2),
			pI: +r.pi.toFixed(2),
			GRAVY: +r.gravy.toFixed(3),
			II: +r.instability.toFixed(1),
			CAI: +r.cai.toFixed(3),
			GC: +r.gc.toFixed(3),
			agg: r.hotspots.length,
			helix: +r.ss.helix.toFixed(3),
			sheet: +r.ss.sheet.toFixed(3)
		}) } });
		setNote(out.ok ? out.text : out.error);
		setBusy(false);
	}
	const kpis = [
		{
			k: "MW",
			v: `${r.kDa.toFixed(2)} kDa`
		},
		{
			k: "pI",
			v: r.pi.toFixed(2)
		},
		{
			k: `z@${pH.toFixed(1)}`,
			v: r.charge.toFixed(2)
		},
		{
			k: "GRAVY",
			v: r.gravy.toFixed(3)
		},
		{
			k: "II",
			v: r.instability.toFixed(1)
		},
		{
			k: "CAI",
			v: r.cai.toFixed(3)
		},
		{
			k: "GC",
			v: `${(r.gc * 100).toFixed(1)}%`
		},
		{
			k: "ε280",
			v: r.extinction.toLocaleString()
		},
		{
			k: "aa",
			v: String(r.aa)
		},
		{
			k: "bp",
			v: String(r.bp)
		},
		{
			k: "helix",
			v: `${(r.ss.helix * 100).toFixed(0)}%`
		},
		{
			k: "sheet",
			v: `${(r.ss.sheet * 100).toFixed(0)}%`
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium tracking-[0.22em] text-muted uppercase",
					children: "Computational core"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl md:text-4xl",
					children: "VEIN"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 font-mono text-xs text-muted",
					children: [
						r.custom ? "custom FASTA" : r.construct.name,
						" · ",
						r.linker.name,
						" · ",
						host,
						" · pH ",
						pH.toFixed(1)
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] tracking-wide text-muted uppercase",
					children: "Score"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-6xl tabular-nums leading-none text-accent",
					children: r.vein.total.toFixed(1)
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesignBar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-4 flex flex-col gap-2 sm:flex-row sm:items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-20 shrink-0 text-xs font-medium tracking-wide text-muted uppercase",
						children: "pH"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						min: 4,
						max: 10,
						step: .1,
						value: pH,
						onChange: (e) => setPh(Number(e.target.value)),
						className: "h-11 w-full accent-[var(--color-accent)]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-12 font-mono text-sm tabular-nums",
						children: pH.toFixed(1)
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-12",
			children: kpis.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[var(--radius-md)] border border-border bg-surface p-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] tracking-wide text-muted uppercase",
					children: x.k
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-mono text-[13px] tabular-nums text-fg",
					children: x.v
				})]
			}, x.k))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 grid gap-3 lg:grid-cols-[1.15fr_0.85fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-[11px] text-muted",
				children: "Linker × host sweep — click a cell to retune the live ORF"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VeinHeatmap, {
				rows: heat,
				activeLinker: linkerId,
				activeHost: host,
				onPick: (l, h) => {
					setLinker(l);
					setHost(h);
				}
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3",
				children: [
					[
						"V value",
						r.vein.V,
						"solubility vs GRAVY and hydrophobic stretches"
					],
					[
						"E expression",
						r.vein.E,
						"CAI × GC window for the selected host"
					],
					[
						"I integrity",
						r.vein.I,
						"Guruprasad dipeptide instability"
					],
					[
						"N novelty",
						r.vein.N,
						"linker flexibility × architecture"
					]
				].map(([k, v, hint]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted",
								children: k
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-sm tabular-nums",
								children: (v * 100).toFixed(0)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 h-1.5 overflow-hidden rounded-full bg-elevated",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full bg-accent",
								style: { width: `${v * 100}%` }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-[10px] text-subtle",
							children: hint
						})
					]
				}, k))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 grid gap-3 lg:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] text-muted",
					children: "Kyte–Doolittle w=9"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HydroChart, { data: r.hydro })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] text-muted",
					children: "Henderson–Hasselbalch charge"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChargeChart, { data: r.titration })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] text-muted",
					children: "GC on optimized CDS"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GcChart, { data: r.gcTrack })] })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-[11px] text-muted",
					children: "Architecture tape"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SequenceTape, { blocks: r.custom ? [{
					id: "custom",
					seq: r.seq,
					kind: "domain"
				}] : r.fusion.blocks }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-[11px] text-muted",
					children: "Residue composition"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompBars, { data: r.comp })
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 grid gap-3 lg:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted",
						children: "Aggregation hotspots (KD ≥ 1.5, no PKRDE)"
					}),
					r.hotspots.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-mono text-xs text-fg",
						children: "none"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 max-h-40 space-y-1 overflow-auto font-mono text-[11px]",
						children: r.hotspots.slice(0, 12).map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							h.start,
							"–",
							h.end,
							" · ",
							h.gravy.toFixed(2)
						] }, `${h.start}-${h.end}`))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-[11px] text-muted",
						children: [
							"disorder ",
							(r.disorder * 100).toFixed(1),
							"% · aliphatic ",
							r.aliphatic.toFixed(1),
							" · rare codon runs ",
							r.rare.length
						]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted",
						children: "Restriction remaining after rewrite"
					}),
					r.sites.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-mono text-xs",
						children: "cleared"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 max-h-40 space-y-1 overflow-auto font-mono text-[11px]",
						children: r.sites.slice(0, 16).map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							s.name,
							" @ ",
							s.pos
						] }, `${s.name}-${s.pos}-${i}`))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-[11px] text-muted",
						children: ["rewritten: ", r.avoided.length ? r.avoided.join(", ") : "—"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-[11px] text-muted",
						children: [
							"protease motifs ",
							r.protease.filter((p) => p.name !== "trypsin").length,
							" named · trypsin",
							" ",
							r.protease.filter((p) => p.name === "trypsin").length
						]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] text-muted",
					children: "Ligand complement vs live GRAVY / pI"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 space-y-1",
					children: ligands.slice(0, 6).map(({ m, score }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setMol(m.id),
						className: cn("flex w-full items-center justify-between rounded-[8px] px-2 py-1.5 text-start text-xs", molId === m.id ? "bg-elevated text-fg" : "text-muted hover:text-fg"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: m.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono tabular-nums text-accent",
							children: score.toFixed(1)
						})]
					}, m.id))
				})] })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 grid gap-3 lg:grid-cols-[1.2fr_0.8fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] text-muted",
					children: "Paste FASTA or raw AA (≥12 residues) to override the UniProt fusion"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: draft,
					onChange: (e) => setDraft(e.target.value),
					spellCheck: false,
					rows: 5,
					className: "mt-2 w-full rounded-[var(--radius-sm)] border border-border bg-bg p-3 font-mono text-[11px] text-fg outline-none focus:ring-2 focus:ring-accent/50",
					placeholder: ">custom\\nMKT..."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						onClick: () => setCustomSeq(draft),
						children: "Compute sequence"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => {
							setDraft("");
							setCustomSeq("");
						},
						children: "Clear to construct"
					})]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] text-muted",
					children: "Grok critic — numeric report only, on demand"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-3 w-full",
					disabled: busy,
					onClick: () => void rank(),
					children: busy ? "Scoring…" : "Rank this design"
				}),
				note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted",
					children: note
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-[11px] text-subtle",
					children: "Does not run on load. No wet-lab recipe."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid grid-cols-3 gap-2 text-center",
					children: r.hosts.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("rounded-[8px] bg-elevated p-2", h.host === host && "ring-1 ring-accent/40"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] text-muted",
							children: h.host
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-sm tabular-nums",
							children: h.cai.toFixed(3)
						})]
					}, h.host))
				})
			] })]
		})
	] });
}
//#endregion
export { Dashboard as component };
