import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime, d as useRouterState, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Dna, i as Hexagon, n as Terminal, o as Activity, r as Pill } from "../_libs/lucide-react.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/card-CNsq0p40.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var dict = {
	app: {
		en: "ARIA Lab",
		fa: "آزمایشگاه آریا"
	},
	navHome: {
		en: "VEIN",
		fa: "VEIN"
	},
	navConstructs: {
		en: "Sequence",
		fa: "توالی"
	},
	navLinkers: {
		en: "Codon",
		fa: "کدون"
	},
	navPlasmid: {
		en: "Map",
		fa: "نقشه"
	},
	navArchive: {
		en: "Ligand",
		fa: "لیگاند"
	},
	disclaimer: {
		en: "In-silico engine. UniProt domains + ProtParam/CAI. Not a synthesis order.",
		fa: "موتور in-silico. دامنه‌های UniProt و ProtParam/CAI. سفارش سنتز نیست."
	}
};
function t(lang, key) {
	return dict[key][lang];
}
var useStudio = create()((set) => ({
	lang: "en",
	constructId: "cascade",
	linkerId: "hybrid",
	host: "ecoli",
	molId: "quercetin",
	pH: 7.4,
	customSeq: "",
	setLang: (lang) => set({ lang }),
	setConstruct: (constructId) => set({ constructId }),
	setLinker: (linkerId) => set({ linkerId }),
	setHost: (host) => set({ host }),
	setMol: (molId) => set({ molId }),
	setPh: (pH) => set({ pH }),
	setCustomSeq: (customSeq) => set({ customSeq })
}));
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-sm)] text-sm font-medium transition-[opacity,transform] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:opacity-90",
			outline: "border border-border bg-transparent text-fg hover:bg-elevated",
			ghost: "text-muted hover:bg-elevated hover:text-fg"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var NAV = [
	{
		to: "/",
		key: "navHome",
		icon: Activity
	},
	{
		to: "/constructs",
		key: "navConstructs",
		icon: Hexagon
	},
	{
		to: "/linkers",
		key: "navLinkers",
		icon: Terminal
	},
	{
		to: "/plasmid",
		key: "navPlasmid",
		icon: Dna
	},
	{
		to: "/archive",
		key: "navArchive",
		icon: Pill
	}
];
function AppShell({ children }) {
	const lang = useStudio((s) => s.lang);
	const setLang = useStudio((s) => s.setLang);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const rtl = lang === "fa";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		dir: rtl ? "rtl" : "ltr",
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-20 border-b border-border bg-bg/90 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex min-h-11 items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-8 place-items-center rounded-[var(--radius-sm)] bg-accent text-accent-fg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-lg leading-none",
								children: t(lang, "app")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "hidden items-center gap-1 md:flex",
							children: NAV.map((item) => {
								const Icon = item.icon;
								const on = pathname === item.to;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: item.to,
									className: cn("inline-flex h-11 items-center gap-2 rounded-[var(--radius-sm)] px-3 text-sm", on ? "bg-elevated text-fg" : "text-muted hover:text-fg"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), t(lang, item.key)]
								}, item.to);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => setLang(rtl ? "en" : "fa"),
							children: rtl ? "EN" : "FA"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto max-w-7xl px-4 pb-24 pt-6 md:pb-12",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-20 border-t border-border bg-bg/95 md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-5",
					children: NAV.map((item) => {
						const Icon = item.icon;
						const on = pathname === item.to;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex min-h-14 flex-col items-center justify-center gap-1 text-[11px]", on ? "text-accent" : "text-muted"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), t(lang, item.key)]
						}, item.to);
					})
				})
			})
		]
	});
}
function compact(s) {
	return s.replace(/\s+/g, "").toUpperCase();
}
function slice1(s, start, end) {
	return s.slice(start - 1, end);
}
var TERT = compact(`
MPRAPRCRAVRSLLRSHYREVLPLATFVRRLGPQGWRLVQRGDPAAFRALVAQCLVCVPWDARPPPAAPSFRQVSCLKELVARVLQRLCERGAKNVLAFGFALLDGARGGPPEAFTTSVRSYLPNTVTDALRGSGAWGLLLRRVGDDVLVHLLARCALFVLVAPSCAYQVCGPPLYQLGAATQARPPPHASGPRRRLGCERAWNHSVREAGVPLGLPAPGARRRGGSASRSLPLPKRPRRGAAPEPERTPVGQGSWAHPGRTRGPSDRGFCVVSPARPAEEATSLEGALSGTRHSHPSVGRQHHAGPPSTSRPPRPWDTPCPPVYAETKHFLYSSGDKEQLRPSFLLSSLRPSLTGARRLVETIFLGSRPWMPGTPRRLPRLPQRYWQMRPLFLELLGNHAQCPYGVLLKTHCPLRAAVTPAAGVCAREKPQGSVAAPEEEDTDPRRLVQLLRQHSSPWQVYGFVRACLRRLVPPGLWGSRHNERRFLRNTKKFISLGKHAKLSLQELTWKMSVRDCAWLRRSPGVGCVPAAEHRLREEILAKFLHWLMSVYVVELLRSFFYVTETTFQKNRLFFYRKSVWSKLQSIGIRQHLKRVQLRELSEAEVRQHREARPALLTSRLRFIPKPDGLRPIVNMDYVVGARTFRREKRAERLTSRVKALFSVLNYERARRPGLLGASVLGLDDIHRAWRTFVLRVRAQDPPPELYFVKVDVTGAYDTIPQDRLTEVIASIIKPQNTYCVRRYAVVQKAAHGHVRKAFKSHVSTLTDLQPYMRQFVAHLQETSPLRDAVVIEQSSSLNEASSGLFDVFLRFMCHHAVRIRGKSYVQCQGIPQGSILSTLLCSLCYGDMENKLFAGIRRDGLLLRLVDDFLLVTPHLTHAKTFLRTLVRGVPEYGCVVNLRKTVVNFPVEDEALGGTAFVQMPAHGLFPWCGLLLDTRTLEVQSDYSSYARTSIRASLTFNRGFKAGRNMRRKLFGVLRLKCHSLFLDLQVNSLQTVCTNIYKILLLQAYRFHACVLQLPFHQQVWKNPTFFLRVISDTASLCYSILKAKNAGMSLGAKGAAGPLPSEAVQWLCHQAFLLKLTRHRVTYVPLLGSLRTAQTQLSRKLPGTTLTALEAAANPALPSDFKTILD
`);
var FOXO3 = compact(`
MAEAPASPAPLSPLEVELDPEFEPQSRPRSCTWPLQRPELQASPAKPSGETAADSMIPEEEDDEDDEDGGGRAGSAMAIGGGGGSGTLGSGLLLEDSARVLAPGGQDPGSGPATAAGGLSGGTQALLQPQQPLPPPQPGAAGGSGQPRKCSSRRNAWGNLSYADLITRAIESSPDKRLTLSQIYEWMVRCVPYFKDKGDSNSSAGWKNSIRHNLSLHSRFMRVQNEGTGKSSWWIINPDGGKSGKAPRRRAVSMDNSNKYTKSRGRAAKKKAALQTAPESADDSPSQLSKWPGSPTSRSSDELDAWTDFRSRTNSNASTVSGRLSPIMASTELDEVQDDDAPLSPMLYSSSASLSPSVSKPCTVELPRLTDMAGTMNLNDGLTENLMDDLLDNITLPPSQPSPTGGLMQRSSSFPYTTKGSGLGSPTSSFNSTVFGPSSLNSLRQSPMQTIQENKPATFSSMSHYGNQTLQDLLTNDSLSHSDVMMTQSDPLMSQASTAVSAQNSRRNVMLRNDPMMSFAAQPNQGSLVNQNLLHHQHQTQGALGGSRALSNSVSNMGLSESSSLGSAKHQQQSPVSQSMQTLSDSLSGSSLYSTSANLPVMGHEKFPSDLDLDMFNGSLECDMESIIRSELMDADGLDFNFDSLISTQNVVGLNVGNFTGAKQASSQSWVPG
`);
var SIRT1 = compact(`
MADEAALALQPGGSPSAAGADREAASSPAGEPLRKRPRRDGPGLERSPGEPGGAAPEREVPAAARGCPGAAAAALWREAEAEAAAAGGEQEAQATAAAGEGDNGPGLQGPSREPPLADNLYDEDDDDEGEEEEEAAAAAIGYRDNLLFGDEIITNGFHSCESDEEDRASHASSSDWTPRPRIGPYTFVQQHLMIGTDPRTILKDLLPETIPPPELDDMTLWQIVINILSEPPKRKKRKDINTIEDAVKLLQECKKIIVLTGAGVSVSCGIPDFRSRDGIYARLAVDFPDLPDPQAMFDIEYFRKDPRPFFKFAKEIYPGQFQPSLCHKFIALSDKEGKLLRNYTQNIDTLEQVAGIQRIIQCHGSFATASCLICKYKVDCEAVRGDIFNQVVPRCPRCPADEPLAIMKPEIVFFGENLPEQFHRAMKYDKDEVDLLIVIGSSLKVRPVALIPSSIPHEVPQILINREPLPHLHFDVELLGDCDVIINELCHRLGGEYAKLCCNPVKLSEITEKPPRTQKELAYLSELPPTPLHVSEDSSSPERTSPPDSSVIVTLLDQAAKSNDDLDVSESKGCMEEKPQEVQTSRNVESIAEQMENPDLKNVGSSTGEKNERTSVAGTVRKCWPNRVAKEQISRRLDGNQYLFLPPNRYIFHGAEVYSDSEDDVLSSSSCGSNSDSGTCQSPSLEEPMEDESEIEEFYNGLEDEPDVPERAGGAGFGTDGDDQEAINEAISVKQEVTDMNYPSNKS
`);
var BDNF = compact(`
MTILFLTMVISYFGCMKAAPMKEANIRGQGGLAYPGVRTHGTLESVNGPKAGSRGLTSLADTFEHVIEELLDEDQKVRPNEENNKDADLYTSRVMLSSQVPLEPPLLFLLEEYKNYLDAANMSMRVRRHSDPARRGELSVCDSISEWVTAADKKTAVDMSGGTVTVLEKVPVSKGQLKQYFYETKCNPMGYTKEGCRGIDKRHWNSQCRTTQSYVRALTMDSKKRIGWRFIRIDTSCVCTLTIKRGR
`);
var CREB = compact(`
MTMESGAENQQSGDAAVTEAENQQMTVQAQPQIATLAQVSMPAAHATSSAPTVTLVQLPNGQTVQVHGVIQAAQPSVIQSPQVQTVQISTIAESEDSQESVDSVTDSQKRREILSRRPSYRKILNDLSSDAPGVPRIEEEKSEEETSAPAITTVTVPTPIYQTSSGQYIAITQGGAIQLANNGTDGVQGLQTLTMTNAAATQPGTTILQYAQTTDGQQILVPSNQVVVQAASGDVQTYQIRTAPTSTIAPGVVMASSPALPTQPAEEAARKREVRLMKNREAARECRRKKKEYVKCLENRVAVLENQNKTLIEELKALKDLYCHKSD
`);
var PSD95 = compact(`
MDCLCIVTTKKYRYQDEDTPPLEHSPAHLPNQANSPPVIVNTDTLEAPGYELQVNGTEGEMEYEEITLERGNSGLGFSIAGGTDNPHIGDDPSIFITKIIPGGAAAQDGRLRVNDSILFVNEVDVREVTHSAAVEALKEAGSIVRLYVMRRKPPAEKVMEIKLIKGPKGLGFSIAGGVGNQHIPGDNSIYVTKIIEGGAAHKDGRLQIGDKILAVNSVGLEDVMHEDAVAALKNTYDVVYLKVAKPSNAYLSDSYAPPDITTSYSQHLDNEISHSSYLGTDYPTAMTPTSPRRYSPVAKDLLGEEDIPREPRRIVIHRGSTGLGFNIVGGEDGEGIFISFILAGGPADLSGELRKGDQILSVNGVDLRNASHEQAAIALKNAGQTVTIIAQYKPEEYSRFEAKIHDLREQLMNSSLGSGTASLRSNPKRGFYIRALFDYDKTKDCGFLSQALSFRFGDVLHVIDASDEEWWQARRVHSDSETDDIGFIPSKRRVERREWSRLKAKDWGSSSGSQGREDSVLSYETVTQMEVHYARPIIILGPTKDRANDDLLSEFPDKFGSCVPHTTRPKREYEIDGRDYHFVSSREKMEKDIQAHKFIEAGQYNSHLYGTSVQSVREVAEQGKHCILDVSANAVRRLQAAHLHPIAIFIRPRSLENVLEINKRITEEQARKAFDRATKLEQEFTECFSAIVEGDSFEEIYHKVKRVIEDLSGPYIWVPARERL
`);
var DOMAINS = {
	htert: {
		id: "htert",
		name: "hTERT RT",
		uniprot: "O14746",
		range: "618–935",
		seq: slice1(TERT, 618, 935),
		tone: "a"
	},
	foxo3: {
		id: "foxo3",
		name: "FOXO3 FH+NLS",
		uniprot: "O43524",
		range: "148–270",
		seq: slice1(FOXO3, 148, 270),
		tone: "b"
	},
	sirt1: {
		id: "sirt1",
		name: "SIRT1 catalytic",
		uniprot: "Q96EB6",
		range: "244–498",
		seq: slice1(SIRT1, 244, 498),
		tone: "c"
	},
	bdnf: {
		id: "bdnf",
		name: "BDNF mature",
		uniprot: "P23560",
		range: "129–247",
		seq: slice1(BDNF, 129, 247),
		tone: "a"
	},
	creb: {
		id: "creb",
		name: "CREB KID–bZIP",
		uniprot: "P16220",
		range: "87–327",
		seq: slice1(CREB, 87, 327),
		tone: "b"
	},
	psd95: {
		id: "psd95",
		name: "PSD-95 PDZ1–3",
		uniprot: "P78352",
		range: "65–393",
		seq: slice1(PSD95, 65, 393),
		tone: "c"
	}
};
var CONSTRUCTS = [{
	id: "cascade",
	name: "Aria Cascade-1",
	domains: [
		"htert",
		"foxo3",
		"sirt1"
	]
}, {
	id: "superintel",
	name: "Super-Intel-1",
	domains: [
		"bdnf",
		"creb",
		"psd95"
	]
}];
var LINKERS = [
	{
		id: "gs4",
		name: "GS4",
		sequence: "GGGGS"
	},
	{
		id: "gs8",
		name: "GS8",
		sequence: "GGGGSGGGGS"
	},
	{
		id: "gs12",
		name: "GS12",
		sequence: "GGGGSGGGGSGGGGS"
	},
	{
		id: "gs20",
		name: "GS20",
		sequence: "GGGGSGGGGSGGGGSGGGGS"
	},
	{
		id: "ggr1",
		name: "GGR1",
		sequence: "GGRGGS"
	},
	{
		id: "ggr3",
		name: "GGR3",
		sequence: "GGRGGSGGRGGSGGRGGS"
	},
	{
		id: "ggr4",
		name: "GGR4",
		sequence: "GGRGGSGGRGGSGGRGGSGGRGGS"
	},
	{
		id: "gsp",
		name: "GSP",
		sequence: "GGSGGSGGS"
	},
	{
		id: "gse",
		name: "GSE",
		sequence: "GGGSEGGGSE"
	},
	{
		id: "gsr",
		name: "GSR",
		sequence: "GGGSRGGGSR"
	},
	{
		id: "hybrid",
		name: "Hybrid-GS",
		sequence: "GGGGSGGRGGSGGGGS"
	},
	{
		id: "lowagg",
		name: "Low-Agg",
		sequence: "GSSGSSGSSGSS"
	},
	{
		id: "ultra",
		name: "UltraFlex",
		sequence: "GGSGGSGGSGGSGGSGGSGGSGGS"
	}
];
var HIS = "HHHHHH";
var TEV = "ENLYFQG";
function assembleFusion(construct, linker) {
	const blocks = [];
	construct.domains.forEach((id, i) => {
		const d = DOMAINS[id];
		blocks.push({
			id: d.id,
			seq: d.seq,
			kind: "domain"
		});
		if (i < construct.domains.length - 1) blocks.push({
			id: `lnk-${i}`,
			seq: linker.sequence,
			kind: "linker"
		});
	});
	blocks.push({
		id: "tev",
		seq: TEV,
		kind: "tag"
	});
	blocks.push({
		id: "his",
		seq: HIS,
		kind: "tag"
	});
	return {
		seq: blocks.map((b) => b.seq).join(""),
		blocks
	};
}
/** Kyte–Doolittle, Vihinen flexibility, Guruprasad DIWV (BioPython/Expasy). */
var KD = {
	A: 1.8,
	R: -4.5,
	N: -3.5,
	D: -3.5,
	C: 2.5,
	Q: -3.5,
	E: -3.5,
	G: -.4,
	H: -3.2,
	I: 4.5,
	L: 3.8,
	K: -3.9,
	M: 1.9,
	F: 2.8,
	P: -1.6,
	S: -.8,
	T: -.7,
	W: -.9,
	Y: -1.3,
	V: 4.2
};
var FLEX = {
	A: .984,
	C: .906,
	E: 1.094,
	D: 1.068,
	G: 1.031,
	F: .915,
	I: .927,
	H: .95,
	K: 1.102,
	M: .952,
	L: .935,
	N: 1.048,
	Q: 1.037,
	P: 1.049,
	S: 1.046,
	R: 1.008,
	T: .997,
	W: .904,
	V: .931,
	Y: .929
};
var RESIDUE_MW = {
	A: 89.0935,
	R: 174.2017,
	N: 132.1184,
	D: 133.1032,
	C: 121.159,
	Q: 146.1451,
	E: 147.1299,
	G: 75.0669,
	H: 155.1552,
	I: 131.1736,
	L: 131.1736,
	K: 146.1882,
	M: 149.2124,
	F: 165.19,
	P: 115.131,
	S: 105.093,
	T: 119.1197,
	W: 204.2262,
	Y: 181.1894,
	V: 117.1469
};
var PKA = {
	nterm: 9.69,
	cterm: 2.34,
	D: 3.86,
	E: 4.25,
	C: 8.33,
	Y: 10.07,
	H: 6,
	K: 10.54,
	R: 12.48
};
var DIWV = {
	A: {
		A: 1,
		C: 44.94,
		E: 1,
		D: -7.49,
		G: 1,
		F: 1,
		I: 1,
		H: -7.49,
		K: 1,
		M: 1,
		L: 1,
		N: 1,
		Q: 1,
		P: 20.26,
		S: 1,
		R: 1,
		T: 1,
		W: 1,
		V: 1,
		Y: 1
	},
	C: {
		A: 1,
		C: 1,
		E: 1,
		D: 20.26,
		G: 1,
		F: 1,
		I: 1,
		H: 33.6,
		K: 1,
		M: 33.6,
		L: 20.26,
		N: 1,
		Q: -6.54,
		P: 20.26,
		S: 1,
		R: 1,
		T: 33.6,
		W: 24.68,
		V: -6.54,
		Y: 1
	},
	E: {
		A: 1,
		C: 44.94,
		E: 33.6,
		D: 20.26,
		G: 1,
		F: 1,
		I: 20.26,
		H: -6.54,
		K: 1,
		M: 1,
		L: 1,
		N: 1,
		Q: 20.26,
		P: 20.26,
		S: 20.26,
		R: 1,
		T: 1,
		W: -14.03,
		V: 1,
		Y: 1
	},
	D: {
		A: 1,
		C: 1,
		E: 1,
		D: 1,
		G: 1,
		F: -6.54,
		I: 1,
		H: 1,
		K: -7.49,
		M: 1,
		L: 1,
		N: 1,
		Q: 1,
		P: 1,
		S: 20.26,
		R: -6.54,
		T: -14.03,
		W: 1,
		V: 1,
		Y: 1
	},
	G: {
		A: -7.49,
		C: 1,
		E: -6.54,
		D: 1,
		G: 13.34,
		F: 1,
		I: -7.49,
		H: 1,
		K: -7.49,
		M: 1,
		L: 1,
		N: -7.49,
		Q: 1,
		P: 1,
		S: 1,
		R: 1,
		T: -7.49,
		W: 13.34,
		V: 1,
		Y: -7.49
	},
	F: {
		A: 1,
		C: 1,
		E: 1,
		D: 13.34,
		G: 1,
		F: 1,
		I: 1,
		H: 1,
		K: -14.03,
		M: 1,
		L: 1,
		N: 1,
		Q: 1,
		P: 20.26,
		S: 1,
		R: 1,
		T: 1,
		W: 1,
		V: 1,
		Y: 33.601
	},
	I: {
		A: 1,
		C: 1,
		E: 44.94,
		D: 1,
		G: 1,
		F: 1,
		I: 1,
		H: 13.34,
		K: -7.49,
		M: 1,
		L: 20.26,
		N: 1,
		Q: 1,
		P: -1.88,
		S: 1,
		R: 1,
		T: 1,
		W: 1,
		V: -7.49,
		Y: 1
	},
	H: {
		A: 1,
		C: 1,
		E: 1,
		D: 1,
		G: -9.37,
		F: -9.37,
		I: 44.94,
		H: 1,
		K: 24.68,
		M: 1,
		L: 1,
		N: 24.68,
		Q: 1,
		P: -1.88,
		S: 1,
		R: 1,
		T: -6.54,
		W: -1.88,
		V: 1,
		Y: 44.94
	},
	K: {
		A: 1,
		C: 1,
		E: 1,
		D: 1,
		G: -7.49,
		F: 1,
		I: -7.49,
		H: 1,
		K: 1,
		M: 33.6,
		L: -7.49,
		N: 1,
		Q: 24.64,
		P: -6.54,
		S: 1,
		R: 33.6,
		T: 1,
		W: 1,
		V: -7.49,
		Y: 1
	},
	M: {
		A: 13.34,
		C: 1,
		E: 1,
		D: 1,
		G: 1,
		F: 1,
		I: 1,
		H: 58.28,
		K: 1,
		M: -1.88,
		L: 1,
		N: 1,
		Q: -6.54,
		P: 44.94,
		S: 44.94,
		R: -6.54,
		T: -1.88,
		W: 1,
		V: 1,
		Y: 24.68
	},
	L: {
		A: 1,
		C: 1,
		E: 1,
		D: 1,
		G: 1,
		F: 1,
		I: 1,
		H: 1,
		K: -7.49,
		M: 1,
		L: 1,
		N: 1,
		Q: 33.6,
		P: 20.26,
		S: 1,
		R: 20.26,
		T: 1,
		W: 24.68,
		V: 1,
		Y: 1
	},
	N: {
		A: 1,
		C: -1.88,
		E: 1,
		D: 1,
		G: -14.03,
		F: -14.03,
		I: 44.94,
		H: 1,
		K: 24.68,
		M: 1,
		L: 1,
		N: 1,
		Q: -6.54,
		P: -1.88,
		S: 1,
		R: 1,
		T: -7.49,
		W: -9.37,
		V: 1,
		Y: 1
	},
	Q: {
		A: 1,
		C: -6.54,
		E: 20.26,
		D: 20.26,
		G: 1,
		F: -6.54,
		I: 1,
		H: 1,
		K: 1,
		M: 1,
		L: 1,
		N: 1,
		Q: 20.26,
		P: 20.26,
		S: 44.94,
		R: 1,
		T: 1,
		W: 1,
		V: -6.54,
		Y: -6.54
	},
	P: {
		A: 20.26,
		C: -6.54,
		E: 18.38,
		D: -6.54,
		G: 1,
		F: 20.26,
		I: 1,
		H: 1,
		K: 1,
		M: -6.54,
		L: 1,
		N: 1,
		Q: 20.26,
		P: 20.26,
		S: 20.26,
		R: -6.54,
		T: 1,
		W: -1.88,
		V: 20.26,
		Y: 1
	},
	S: {
		A: 1,
		C: 33.6,
		E: 20.26,
		D: 1,
		G: 1,
		F: 1,
		I: 1,
		H: 1,
		K: 1,
		M: 1,
		L: 1,
		N: 1,
		Q: 20.26,
		P: 44.94,
		S: 20.26,
		R: 20.26,
		T: 1,
		W: 1,
		V: 1,
		Y: 1
	},
	R: {
		A: 1,
		C: 1,
		E: 1,
		D: 1,
		G: -7.49,
		F: 1,
		I: 1,
		H: 20.26,
		K: 1,
		M: 1,
		L: 1,
		N: 13.34,
		Q: 20.26,
		P: 20.26,
		S: 44.94,
		R: 58.28,
		T: 1,
		W: 58.28,
		V: 1,
		Y: -6.54
	},
	T: {
		A: 1,
		C: 1,
		E: 20.26,
		D: 1,
		G: -7.49,
		F: 13.34,
		I: 1,
		H: 1,
		K: 1,
		M: 1,
		L: 1,
		N: -14.03,
		Q: -6.54,
		P: 1,
		S: 1,
		R: 1,
		T: 1,
		W: -14.03,
		V: 1,
		Y: 1
	},
	W: {
		A: -14.03,
		C: 1,
		E: 1,
		D: 1,
		G: -9.37,
		F: 1,
		I: 1,
		H: 24.68,
		K: 1,
		M: 24.68,
		L: 13.34,
		N: 13.34,
		Q: 1,
		P: 1,
		S: 1,
		R: 1,
		T: -14.03,
		W: 1,
		V: -7.49,
		Y: 1
	},
	V: {
		A: 1,
		C: 1,
		E: 1,
		D: -14.03,
		G: -7.49,
		F: 1,
		I: 1,
		H: 1,
		K: -1.88,
		M: 1,
		L: 1,
		N: 1,
		Q: 1,
		P: 20.26,
		S: 1,
		R: 1,
		T: -7.49,
		W: 1,
		V: 1,
		Y: -6.54
	},
	Y: {
		A: 24.68,
		C: 1,
		E: -6.54,
		D: 24.68,
		G: -7.49,
		F: 1,
		I: 1,
		H: 13.34,
		K: 1,
		M: 44.94,
		L: 1,
		N: 1,
		Q: 1,
		P: 13.34,
		S: 1,
		R: -15.91,
		T: -7.49,
		W: -9.37,
		V: 1,
		Y: 13.34
	}
};
/** Sharp & Li 1987 E. coli CAI w (BioPython SharpEcoliIndex). */
var W_ECOLI = {
	GCA: .586,
	GCC: .122,
	GCG: .424,
	GCT: 1,
	AGA: .004,
	AGG: .002,
	CGA: .004,
	CGC: .356,
	CGG: .004,
	CGT: 1,
	AAC: 1,
	AAT: .051,
	GAC: 1,
	GAT: .434,
	TGC: 1,
	TGT: .5,
	CAA: .124,
	CAG: 1,
	GAA: 1,
	GAG: .259,
	GGA: .01,
	GGC: .724,
	GGG: .019,
	GGT: 1,
	CAC: 1,
	CAT: .291,
	ATA: .003,
	ATC: 1,
	ATT: .185,
	CTA: .007,
	CTC: .037,
	CTG: 1,
	CTT: .042,
	TTA: .02,
	TTG: .02,
	AAA: 1,
	AAG: .253,
	ATG: 1,
	TTC: 1,
	TTT: .296,
	CCA: .135,
	CCC: .012,
	CCG: 1,
	CCT: .07,
	AGC: .41,
	AGT: .085,
	TCA: .077,
	TCC: .744,
	TCG: .017,
	TCT: 1,
	ACA: .076,
	ACC: 1,
	ACG: .099,
	ACT: .965,
	TGG: 1,
	TAC: 1,
	TAT: .239,
	GTA: .495,
	GTC: .066,
	GTG: .221,
	GTT: 1,
	TAA: 1,
	TAG: .033,
	TGA: .078
};
/** Pichia / S. cerevisiae-like highly expressed w. */
var W_PICHIA = {
	GCA: .5,
	GCC: .31,
	GCG: .11,
	GCT: 1,
	AGA: 1,
	AGG: .16,
	CGA: .05,
	CGC: .06,
	CGG: .04,
	CGT: .32,
	AAC: 1,
	AAT: .41,
	GAC: .67,
	GAT: 1,
	TGC: .43,
	TGT: 1,
	CAA: 1,
	CAG: .22,
	GAA: 1,
	GAG: .19,
	GGA: .22,
	GGC: .22,
	GGG: .12,
	GGT: 1,
	CAC: .64,
	CAT: 1,
	ATA: .23,
	ATC: .52,
	ATT: 1,
	CTA: .23,
	CTC: .11,
	CTG: .18,
	CTT: .17,
	TTA: .49,
	TTG: 1,
	AAA: 1,
	AAG: .73,
	ATG: 1,
	TTC: 1,
	TTT: .59,
	CCA: 1,
	CCC: .15,
	CCG: .12,
	CCT: .31,
	AGC: .16,
	AGT: .25,
	TCA: .29,
	TCC: .42,
	TCG: .1,
	TCT: 1,
	ACA: .3,
	ACC: .47,
	ACG: .14,
	ACT: 1,
	TGG: 1,
	TAC: 1,
	TAT: .56,
	GTA: .21,
	GTC: .42,
	GTG: .19,
	GTT: 1,
	TAA: 1,
	TAG: .2,
	TGA: .2
};
/** Human highly expressed relative adaptiveness (Kazusa-style). */
var W_HUMAN = {
	GCA: .5,
	GCC: 1,
	GCG: .28,
	GCT: .64,
	AGA: .26,
	AGG: .28,
	CGA: .27,
	CGC: .83,
	CGG: .51,
	CGT: .17,
	AAC: 1,
	AAT: .46,
	GAC: 1,
	GAT: .46,
	TGC: 1,
	TGT: .45,
	CAA: .26,
	CAG: 1,
	GAA: .42,
	GAG: 1,
	GGA: .25,
	GGC: 1,
	GGG: .32,
	GGT: .18,
	CAC: 1,
	CAT: .42,
	ATA: .16,
	ATC: 1,
	ATT: .35,
	CTA: .14,
	CTC: .48,
	CTG: 1,
	CTT: .25,
	TTA: .14,
	TTG: .25,
	AAA: .42,
	AAG: 1,
	ATG: 1,
	TTC: 1,
	TTT: .43,
	CCA: .52,
	CCC: 1,
	CCG: .34,
	CCT: .53,
	AGC: .87,
	AGT: .3,
	TCA: .25,
	TCC: .8,
	TCG: .17,
	TCT: .48,
	ACA: .46,
	ACC: 1,
	ACG: .28,
	ACT: .44,
	TGG: 1,
	TAC: 1,
	TAT: .43,
	GTA: .16,
	GTC: .46,
	GTG: 1,
	GTT: .25,
	TAA: .47,
	TAG: .23,
	TGA: 1
};
var AA_CODONS = {
	A: [
		"GCT",
		"GCC",
		"GCA",
		"GCG"
	],
	R: [
		"CGT",
		"CGC",
		"CGA",
		"CGG",
		"AGA",
		"AGG"
	],
	N: ["AAT", "AAC"],
	D: ["GAT", "GAC"],
	C: ["TGT", "TGC"],
	Q: ["CAA", "CAG"],
	E: ["GAA", "GAG"],
	G: [
		"GGT",
		"GGC",
		"GGA",
		"GGG"
	],
	H: ["CAT", "CAC"],
	I: [
		"ATT",
		"ATC",
		"ATA"
	],
	L: [
		"TTA",
		"TTG",
		"CTT",
		"CTC",
		"CTA",
		"CTG"
	],
	K: ["AAA", "AAG"],
	M: ["ATG"],
	F: ["TTT", "TTC"],
	P: [
		"CCT",
		"CCC",
		"CCA",
		"CCG"
	],
	S: [
		"TCT",
		"TCC",
		"TCA",
		"TCG",
		"AGT",
		"AGC"
	],
	T: [
		"ACT",
		"ACC",
		"ACA",
		"ACG"
	],
	W: ["TGG"],
	Y: ["TAT", "TAC"],
	V: [
		"GTT",
		"GTC",
		"GTA",
		"GTG"
	],
	"*": [
		"TAA",
		"TAG",
		"TGA"
	]
};
var SITES = [
	{
		name: "EcoRI",
		seq: "GAATTC"
	},
	{
		name: "BamHI",
		seq: "GGATCC"
	},
	{
		name: "XhoI",
		seq: "CTCGAG"
	},
	{
		name: "NdeI",
		seq: "CATATG"
	},
	{
		name: "NcoI",
		seq: "CCATGG"
	},
	{
		name: "HindIII",
		seq: "AAGCTT"
	},
	{
		name: "NotI",
		seq: "GCGGCCGC"
	},
	{
		name: "XbaI",
		seq: "TCTAGA"
	},
	{
		name: "SpeI",
		seq: "ACTAGT"
	},
	{
		name: "PstI",
		seq: "CTGCAG"
	},
	{
		name: "SacI",
		seq: "GAGCTC"
	},
	{
		name: "KpnI",
		seq: "GGTACC"
	}
];
function countAa(seq) {
	const c = {};
	for (const a of seq) c[a] = (c[a] ?? 0) + 1;
	return c;
}
function molecularWeight(seq) {
	if (!seq.length) return 0;
	let sum = 0;
	for (const a of seq) sum += RESIDUE_MW[a] ?? 0;
	return sum - (seq.length - 1) * 18.01528;
}
function gravy(seq) {
	if (!seq.length) return 0;
	let s = 0;
	for (const a of seq) s += KD[a] ?? 0;
	return s / seq.length;
}
function aliphaticIndex(seq) {
	const n = seq.length || 1;
	const A = (seq.match(/A/g) ?? []).length / n;
	const V = (seq.match(/V/g) ?? []).length / n;
	const I = (seq.match(/I/g) ?? []).length / n;
	const L = (seq.match(/L/g) ?? []).length / n;
	return 100 * (A + 2.9 * V + 3.9 * (I + L));
}
function extinction280(seq) {
	const W = (seq.match(/W/g) ?? []).length;
	const Y = (seq.match(/Y/g) ?? []).length;
	const C = (seq.match(/C/g) ?? []).length;
	return W * 5500 + Y * 1490 + C * 125;
}
function instabilityIndex(seq) {
	if (seq.length < 2) return 0;
	let sum = 0;
	for (let i = 0; i < seq.length - 1; i++) sum += DIWV[seq[i]]?.[seq[i + 1]] ?? 1;
	return 10 / seq.length * sum;
}
function flexibilityMean(seq) {
	if (!seq.length) return 1;
	let s = 0;
	for (const a of seq) s += FLEX[a] ?? 1;
	return s / seq.length;
}
function chargeAtPh(seq, pH) {
	if (!seq.length) return 0;
	const pos = (pKa) => 1 / (1 + 10 ** (pH - pKa));
	const neg = (pKa) => -1 / (1 + 10 ** (pKa - pH));
	const c = countAa(seq);
	let q = pos(PKA.nterm) + neg(PKA.cterm);
	q += (c.K ?? 0) * pos(PKA.K);
	q += (c.R ?? 0) * pos(PKA.R);
	q += (c.H ?? 0) * pos(PKA.H);
	q += (c.D ?? 0) * neg(PKA.D);
	q += (c.E ?? 0) * neg(PKA.E);
	q += (c.C ?? 0) * neg(PKA.C);
	q += (c.Y ?? 0) * neg(PKA.Y);
	return q;
}
function isoelectricPoint(seq) {
	let lo = 0;
	let hi = 14;
	for (let i = 0; i < 40; i++) {
		const mid = (lo + hi) / 2;
		if (chargeAtPh(seq, mid) > 0) lo = mid;
		else hi = mid;
	}
	return (lo + hi) / 2;
}
function hydropathyWindow(seq, win = 9) {
	const half = Math.floor(Math.max(3, win) / 2);
	const out = [];
	for (let i = 0; i < seq.length; i++) {
		let s = 0;
		let n = 0;
		for (let j = i - half; j <= i + half; j++) {
			if (j < 0 || j >= seq.length) continue;
			s += KD[seq[j]] ?? 0;
			n++;
		}
		out.push({
			i: i + 1,
			kd: n ? s / n : 0
		});
	}
	return out;
}
function aggregationHotspots(seq, win = 6) {
	const hits = [];
	for (let i = 0; i <= seq.length - win; i++) {
		const chunk = seq.slice(i, i + win);
		if (/[PKRDE]/.test(chunk)) continue;
		const g = gravy(chunk);
		if (g >= 1.5) hits.push({
			start: i + 1,
			end: i + win,
			gravy: g
		});
	}
	const merged = [];
	for (const h of hits) {
		const last = merged[merged.length - 1];
		if (last && h.start <= last.end + 1) last.end = Math.max(last.end, h.end);
		else merged.push({ ...h });
	}
	return merged;
}
function disorderFraction(seq, win = 21) {
	if (!seq.length) return 0;
	const half = Math.floor(win / 2);
	let n = 0;
	for (let i = 0; i < seq.length; i++) {
		let score = 0;
		let c = 0;
		for (let j = i - half; j <= i + half; j++) {
			if (j < 0 || j >= seq.length) continue;
			const a = seq[j];
			if ("PESQKRG".includes(a)) score += 1;
			if ("WIFVL".includes(a)) score -= 1;
			c++;
		}
		if (c && score / c > .25) n++;
	}
	return n / seq.length;
}
function gcContent(dna) {
	if (!dna.length) return 0;
	return (dna.match(/[GC]/g) ?? []).length / dna.length;
}
function weightsFor(host) {
	if (host === "pichia") return W_PICHIA;
	if (host === "human") return W_HUMAN;
	return W_ECOLI;
}
function caiOf(dna, host) {
	const wtab = weightsFor(host);
	const usable = (dna.match(/.{1,3}/g) ?? []).filter((c) => c.length === 3 && c !== "TAA" && c !== "TAG" && c !== "TGA");
	if (!usable.length) return 0;
	let log = 0;
	for (const c of usable) {
		const w = Math.max(wtab[c] ?? .001, .001);
		log += Math.log(w);
	}
	return Math.exp(log / usable.length);
}
function bestCodon(aa, host, forbidden) {
	const wtab = weightsFor(host);
	const opts = [...AA_CODONS[aa] ?? ["NNN"]].sort((a, b) => (wtab[b] ?? 0) - (wtab[a] ?? 0));
	if (!forbidden) return opts[0] ?? "NNN";
	for (const c of opts) if (![...forbidden].some((f) => c.includes(f))) return c;
	return opts[0] ?? "NNN";
}
function optimizeDna(seq, host) {
	let dna = "";
	for (const aa of seq) dna += bestCodon(aa, host);
	dna += bestCodon("*", host);
	const hit = /* @__PURE__ */ new Set();
	for (let pass = 0; pass < 4; pass++) {
		let changed = false;
		for (const site of SITES) {
			let idx = dna.indexOf(site.seq);
			while (idx >= 0) {
				hit.add(site.name);
				const codonI = Math.floor(idx / 3);
				const aa = seq[codonI];
				if (aa) {
					const alts = [...AA_CODONS[aa] ?? []].sort((a, b) => (weightsFor(host)[b] ?? 0) - (weightsFor(host)[a] ?? 0));
					for (const alt of alts) {
						const trial = dna.slice(0, codonI * 3) + alt + dna.slice(codonI * 3 + 3);
						if (!trial.includes(site.seq)) {
							dna = trial;
							changed = true;
							break;
						}
					}
				}
				idx = dna.indexOf(site.seq, idx + 1);
			}
		}
		if (!changed) break;
	}
	return {
		dna,
		avoided: [...hit]
	};
}
function findSites(dna) {
	const out = [];
	for (const s of SITES) {
		let i = dna.indexOf(s.seq);
		while (i >= 0) {
			out.push({
				name: s.name,
				pos: i + 1
			});
			i = dna.indexOf(s.seq, i + 1);
		}
	}
	return out;
}
function rareCodonRuns(dna, host, thresh = .2) {
	const wtab = weightsFor(host);
	const rare = (dna.match(/.{3}/g) ?? []).map((c) => (wtab[c] ?? 0) < thresh);
	const runs = [];
	let i = 0;
	while (i < rare.length) {
		if (!rare[i]) {
			i++;
			continue;
		}
		let j = i;
		while (j < rare.length && rare[j]) j++;
		if (j - i >= 3) runs.push({
			start: i * 3 + 1,
			end: j * 3
		});
		i = j;
	}
	return runs;
}
function sigmoid(x) {
	return 1 / (1 + Math.exp(-x));
}
function clamp01(x) {
	return Math.min(1, Math.max(0, x));
}
function veinScore(input) {
	const V = clamp01(sigmoid(-input.gravy * 1.6) * (1 - input.aggFrac));
	const gcScore = clamp01(1 - Math.abs(input.gc - .51) / .35);
	const E = clamp01(input.cai * gcScore);
	const I = clamp01(sigmoid((40 - input.instability) / 8));
	const N = clamp01((input.linkerFlex - .9) / .2) * clamp01(Math.log2(input.domainCount + 1) / 2);
	return {
		V,
		E,
		I,
		N,
		total: 100 * (.28 * V + .34 * E + .26 * I + .12 * N)
	};
}
function gcWindow(dna, win = 30) {
	const out = [];
	const step = 9;
	for (let i = 0; i + win <= dna.length; i += step) {
		const chunk = dna.slice(i, i + win);
		out.push({
			i: i + 1,
			gc: gcContent(chunk)
		});
	}
	return out;
}
function chargeCurve(seq) {
	const out = [];
	for (let pH = 3; pH <= 11.01; pH += .25) out.push({
		pH,
		q: chargeAtPh(seq, pH)
	});
	return out;
}
var PA = {
	A: 1.42,
	R: .98,
	N: .67,
	D: 1.01,
	C: .7,
	Q: 1.11,
	E: 1.51,
	G: .57,
	H: 1,
	I: 1.08,
	L: 1.21,
	K: 1.16,
	M: 1.45,
	F: 1.13,
	P: .57,
	S: .77,
	T: .83,
	W: 1.08,
	Y: .69,
	V: 1.06
};
var PB = {
	A: .83,
	R: .93,
	N: .89,
	D: .54,
	C: 1.19,
	Q: 1.1,
	E: .37,
	G: .75,
	H: .87,
	I: 1.6,
	L: 1.3,
	K: .74,
	M: 1.05,
	F: 1.38,
	P: .55,
	S: .75,
	T: 1.19,
	W: 1.37,
	Y: 1.47,
	V: 1.7
};
function chouFasman(seq) {
	if (!seq.length) return {
		helix: 0,
		sheet: 0,
		coil: 1
	};
	let h = 0;
	let s = 0;
	for (let i = 0; i < seq.length; i++) {
		let pa = 0;
		let pb = 0;
		let n = 0;
		for (let j = i; j < i + 6 && j < seq.length; j++) {
			pa += PA[seq[j]] ?? 1;
			pb += PB[seq[j]] ?? 1;
			n++;
		}
		const a = pa / n;
		const b = pb / n;
		if (a >= 1.03 && a >= b) h++;
		else if (b >= 1.05) s++;
	}
	const helix = h / seq.length;
	const sheet = s / seq.length;
	return {
		helix,
		sheet,
		coil: Math.max(0, 1 - helix - sheet)
	};
}
function proteaseMotifs(seq) {
	const out = [];
	for (let i = 0; i < seq.length; i++) {
		const a = seq[i];
		if ((a === "K" || a === "R") && seq[i + 1] !== "P") out.push({
			name: "trypsin",
			pos: i + 1
		});
	}
	let i = seq.indexOf("ENLYFQ");
	while (i >= 0) {
		out.push({
			name: "TEV",
			pos: i + 1
		});
		i = seq.indexOf("ENLYFQ", i + 1);
	}
	i = seq.indexOf("LVPRGS");
	while (i >= 0) {
		out.push({
			name: "thrombin",
			pos: i + 1
		});
		i = seq.indexOf("LVPRGS", i + 1);
	}
	return out;
}
function compositionBars(seq) {
	const c = countAa(seq);
	const n = seq.length || 1;
	return "ACDEFGHIKLMNPQRSTVWY".split("").map((aa) => ({
		aa,
		n: c[aa] ?? 0,
		f: (c[aa] ?? 0) / n
	}));
}
function analyzeDesign(constructId, linkerId, host, pH = 7.4, customSeq) {
	const construct = CONSTRUCTS.find((c) => c.id === constructId);
	const linker = LINKERS.find((l) => l.id === linkerId);
	const fusion = assembleFusion(construct, linker);
	const raw = (customSeq ?? "").replace(/[^A-Za-z]/g, "").toUpperCase().replace(/[^ACDEFGHIKLMNPQRSTVWY]/g, "");
	const seq = raw.length >= 12 ? raw : fusion.seq;
	const custom = raw.length >= 12;
	const { dna, avoided } = optimizeDna(seq, host);
	const mw = molecularWeight(seq);
	const g = gravy(seq);
	const ii = instabilityIndex(seq);
	const pi = isoelectricPoint(seq);
	const cai = caiOf(dna, host);
	const gc = gcContent(dna);
	const hot = aggregationHotspots(seq);
	const aggFrac = hot.reduce((a, h) => a + (h.end - h.start + 1), 0) / Math.max(1, seq.length);
	const ss = chouFasman(seq);
	const vein = veinScore({
		gravy: g,
		cai,
		gc,
		instability: ii,
		aggFrac,
		linkerFlex: flexibilityMean(custom ? seq.slice(0, 24) : linker.sequence),
		domainCount: custom ? 1 : construct.domains.length
	});
	const hosts = [
		"ecoli",
		"pichia",
		"human"
	].map((h) => {
		const d = optimizeDna(seq, h).dna;
		return {
			host: h,
			cai: caiOf(d, h),
			gc: gcContent(d)
		};
	});
	return {
		construct,
		linker,
		fusion,
		custom,
		seq,
		dna,
		avoided,
		mw,
		kDa: mw / 1e3,
		gravy: g,
		instability: ii,
		pi,
		pH,
		charge: chargeAtPh(seq, pH),
		aliphatic: aliphaticIndex(seq),
		extinction: extinction280(seq),
		cai,
		gc,
		aa: seq.length,
		bp: dna.length,
		hotspots: hot,
		aggFrac,
		disorder: disorderFraction(seq),
		hydro: hydropathyWindow(seq, 9),
		titration: chargeCurve(seq),
		gcTrack: gcWindow(dna, 36),
		rare: rareCodonRuns(dna, host),
		sites: findSites(dna),
		protease: proteaseMotifs(seq),
		ss,
		comp: compositionBars(seq),
		vein,
		hosts,
		domains: construct.domains.map((id) => DOMAINS[id]),
		linkerFlex: flexibilityMean(custom ? seq.slice(0, 24) : linker.sequence)
	};
}
function sweepVein(constructId, customSeq) {
	const hosts = [
		"ecoli",
		"pichia",
		"human"
	];
	return LINKERS.map((l) => ({
		linkerId: l.id,
		name: l.name,
		cells: hosts.map((h) => ({
			host: h,
			vein: analyzeDesign(constructId, l.id, h, 7.4, customSeq).vein.total
		}))
	}));
}
var HOSTS = [
	{
		id: "ecoli",
		label: "E. coli"
	},
	{
		id: "pichia",
		label: "Pichia"
	},
	{
		id: "human",
		label: "Human"
	}
];
function DesignBar() {
	const constructId = useStudio((s) => s.constructId);
	const linkerId = useStudio((s) => s.linkerId);
	const host = useStudio((s) => s.host);
	const setConstruct = useStudio((s) => s.setConstruct);
	const setLinker = useStudio((s) => s.setLinker);
	const setHost = useStudio((s) => s.setHost);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				label: "Construct",
				children: CONSTRUCTS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					on: constructId === c.id,
					onClick: () => setConstruct(c.id),
					children: c.name
				}, c.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				label: "Host",
				children: HOSTS.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					on: host === h.id,
					onClick: () => setHost(h.id),
					children: h.label
				}, h.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				label: "Linker",
				children: LINKERS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					on: linkerId === l.id,
					onClick: () => setLinker(l.id),
					children: l.name
				}, l.id))
			})
		]
	});
}
function Row({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-2 sm:flex-row sm:items-start",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "w-20 shrink-0 pt-2 text-xs font-medium tracking-wide text-muted uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-1.5",
			children
		})]
	});
}
function Chip({ on, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("h-9 rounded-full border px-3 text-xs font-medium", on ? "border-accent/50 bg-accent text-accent-fg" : "border-border bg-surface text-muted hover:text-fg"),
		children
	});
}
function Card({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-[var(--radius-lg)] border border-border bg-surface p-4", className),
		...props
	});
}
//#endregion
export { LINKERS as a, sweepVein as c, DesignBar as i, useStudio as l, Button as n, analyzeDesign as o, Card as r, cn as s, AppShell as t };
