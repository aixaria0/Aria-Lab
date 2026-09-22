//#region node_modules/.nitro/vite/services/ssr/assets/molecule-JhD7UwoI.js
var MOLECULES = [
	{
		id: "apigenin",
		name: "Apigenin-like",
		smiles: "O=C1C=C(c2ccc(O)cc2)Oc2cc(O)cc(O)c21",
		note: "Flavone, 3 OH"
	},
	{
		id: "luteolin",
		name: "Luteolin-like",
		smiles: "O=C1C=C(c2ccc(O)c(O)c2)Oc2cc(O)cc(O)c21",
		note: "Catechol B-ring"
	},
	{
		id: "kaempferol",
		name: "Kaempferol-like",
		smiles: "O=C1C(O)=C(c2ccc(O)cc2)Oc2cc(O)cc(O)c21",
		note: "3-OH flavonol"
	},
	{
		id: "quercetin",
		name: "Quercetin-like",
		smiles: "O=C1C(O)=C(c2ccc(O)c(O)c2)Oc2cc(O)cc(O)c21",
		note: "SIRT-adjacent scaffold"
	},
	{
		id: "resveratrol",
		name: "Resveratrol-like",
		smiles: "Oc1ccc(/C=C/c2cc(O)cc(O)c2)cc1",
		note: "Stilbene"
	},
	{
		id: "fisetin",
		name: "Fisetin-like",
		smiles: "O=C1C(O)=C(c2ccc(O)c(O)c2)Oc2ccc(O)cc21",
		note: "Fewer A-ring OH"
	},
	{
		id: "naringenin",
		name: "Naringenin-like",
		smiles: "O=C1CC(c2ccc(O)cc2)Oc2cc(O)cc(O)c21",
		note: "Flavanone"
	},
	{
		id: "egcg",
		name: "EGCG-core",
		smiles: "O=C(Oc1cc(O)c2c(c1)OC(c1cc(O)c(O)c(O)c1)C(O)C2O)c1cc(O)c(O)c(O)c1",
		note: "Gallocatechin gallate"
	}
];
var ATOM_LOGP = {
	C: .1441,
	c: .13,
	N: -.48,
	n: -.41,
	O: -.04,
	o: -.03,
	F: .42,
	S: .47,
	Cl: .6,
	Br: .8
};
function molProps(smiles) {
	const hbd = (smiles.match(/[OH](?![a-zA-Z])|nH|NH/g) ?? []).length;
	const o = (smiles.match(/O/gi) ?? []).length;
	const n = (smiles.match(/N/gi) ?? []).length;
	const hba = o + n;
	const rot = (smiles.match(/-/g) ?? []).length * .35 + (smiles.match(/\//g) ?? []).length;
	let mw = 0;
	let logP = .2;
	const re = /Cl|Br|[A-Z][a-z]?|[a-z]/g;
	let m;
	const ATOM_MW = {
		C: 12.011,
		c: 12.011,
		N: 14.007,
		n: 14.007,
		O: 15.999,
		o: 15.999,
		F: 18.998,
		S: 32.06,
		Cl: 35.45,
		Br: 79.9,
		H: 1.008,
		P: 30.974
	};
	while (m = re.exec(smiles)) {
		const a = m[0];
		mw += ATOM_MW[a] ?? 0;
		logP += ATOM_LOGP[a] ?? 0;
	}
	mw += hbd * 1.008;
	const tpsa = 20.23 * n + 23.79 * o;
	let lip = 0;
	if (mw > 500) lip++;
	if (logP > 5) lip++;
	if (hbd > 5) lip++;
	if (hba > 10) lip++;
	const qed = 1 / (1 + Math.exp(.012 * Math.abs(mw - 320) + .45 * Math.abs(logP - 2.3) + .35 * Math.abs(hbd - 2) + .2 * Math.abs(hba - 5) + .8 * lip));
	return {
		mw,
		logP,
		hbd,
		hba,
		tpsa,
		rot,
		lipinski: lip,
		qed
	};
}
function complementScore(mol, proteinGravy, proteinPi) {
	const lipoMatch = 1 - Math.min(1, Math.abs(mol.logP - (proteinGravy + 2.5)) / 4);
	const size = 1 - Math.min(1, Math.abs(mol.mw - 360) / 400);
	const rule = 1 - mol.lipinski / 4;
	const chargeHint = proteinPi > 8 ? mol.hba > mol.hbd ? 1 : .6 : .8;
	return 100 * (.35 * mol.qed + .25 * lipoMatch + .2 * size + .15 * rule + .05 * chargeHint);
}
//#endregion
export { complementScore as n, molProps as r, MOLECULES as t };
