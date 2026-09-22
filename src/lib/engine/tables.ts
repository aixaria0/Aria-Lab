/** Kyte–Doolittle, Vihinen flexibility, Guruprasad DIWV (BioPython/Expasy). */

export const KD: Record<string, number> = {
  A: 1.8, R: -4.5, N: -3.5, D: -3.5, C: 2.5, Q: -3.5, E: -3.5, G: -0.4, H: -3.2,
  I: 4.5, L: 3.8, K: -3.9, M: 1.9, F: 2.8, P: -1.6, S: -0.8, T: -0.7, W: -0.9,
  Y: -1.3, V: 4.2,
};

export const FLEX: Record<string, number> = {
  A: 0.984, C: 0.906, E: 1.094, D: 1.068, G: 1.031, F: 0.915, I: 0.927, H: 0.95,
  K: 1.102, M: 0.952, L: 0.935, N: 1.048, Q: 1.037, P: 1.049, S: 1.046, R: 1.008,
  T: 0.997, W: 0.904, V: 0.931, Y: 0.929,
};

export const RESIDUE_MW: Record<string, number> = {
  A: 89.0935, R: 174.2017, N: 132.1184, D: 133.1032, C: 121.159,
  Q: 146.1451, E: 147.1299, G: 75.0669, H: 155.1552, I: 131.1736,
  L: 131.1736, K: 146.1882, M: 149.2124, F: 165.19, P: 115.131,
  S: 105.093, T: 119.1197, W: 204.2262, Y: 181.1894, V: 117.1469,
};

export const PKA = {
  nterm: 9.69,
  cterm: 2.34,
  D: 3.86,
  E: 4.25,
  C: 8.33,
  Y: 10.07,
  H: 6.0,
  K: 10.54,
  R: 12.48,
};

export const DIWV: Record<string, Record<string, number>> = {
  A: { A: 1, C: 44.94, E: 1, D: -7.49, G: 1, F: 1, I: 1, H: -7.49, K: 1, M: 1, L: 1, N: 1, Q: 1, P: 20.26, S: 1, R: 1, T: 1, W: 1, V: 1, Y: 1 },
  C: { A: 1, C: 1, E: 1, D: 20.26, G: 1, F: 1, I: 1, H: 33.6, K: 1, M: 33.6, L: 20.26, N: 1, Q: -6.54, P: 20.26, S: 1, R: 1, T: 33.6, W: 24.68, V: -6.54, Y: 1 },
  E: { A: 1, C: 44.94, E: 33.6, D: 20.26, G: 1, F: 1, I: 20.26, H: -6.54, K: 1, M: 1, L: 1, N: 1, Q: 20.26, P: 20.26, S: 20.26, R: 1, T: 1, W: -14.03, V: 1, Y: 1 },
  D: { A: 1, C: 1, E: 1, D: 1, G: 1, F: -6.54, I: 1, H: 1, K: -7.49, M: 1, L: 1, N: 1, Q: 1, P: 1, S: 20.26, R: -6.54, T: -14.03, W: 1, V: 1, Y: 1 },
  G: { A: -7.49, C: 1, E: -6.54, D: 1, G: 13.34, F: 1, I: -7.49, H: 1, K: -7.49, M: 1, L: 1, N: -7.49, Q: 1, P: 1, S: 1, R: 1, T: -7.49, W: 13.34, V: 1, Y: -7.49 },
  F: { A: 1, C: 1, E: 1, D: 13.34, G: 1, F: 1, I: 1, H: 1, K: -14.03, M: 1, L: 1, N: 1, Q: 1, P: 20.26, S: 1, R: 1, T: 1, W: 1, V: 1, Y: 33.601 },
  I: { A: 1, C: 1, E: 44.94, D: 1, G: 1, F: 1, I: 1, H: 13.34, K: -7.49, M: 1, L: 20.26, N: 1, Q: 1, P: -1.88, S: 1, R: 1, T: 1, W: 1, V: -7.49, Y: 1 },
  H: { A: 1, C: 1, E: 1, D: 1, G: -9.37, F: -9.37, I: 44.94, H: 1, K: 24.68, M: 1, L: 1, N: 24.68, Q: 1, P: -1.88, S: 1, R: 1, T: -6.54, W: -1.88, V: 1, Y: 44.94 },
  K: { A: 1, C: 1, E: 1, D: 1, G: -7.49, F: 1, I: -7.49, H: 1, K: 1, M: 33.6, L: -7.49, N: 1, Q: 24.64, P: -6.54, S: 1, R: 33.6, T: 1, W: 1, V: -7.49, Y: 1 },
  M: { A: 13.34, C: 1, E: 1, D: 1, G: 1, F: 1, I: 1, H: 58.28, K: 1, M: -1.88, L: 1, N: 1, Q: -6.54, P: 44.94, S: 44.94, R: -6.54, T: -1.88, W: 1, V: 1, Y: 24.68 },
  L: { A: 1, C: 1, E: 1, D: 1, G: 1, F: 1, I: 1, H: 1, K: -7.49, M: 1, L: 1, N: 1, Q: 33.6, P: 20.26, S: 1, R: 20.26, T: 1, W: 24.68, V: 1, Y: 1 },
  N: { A: 1, C: -1.88, E: 1, D: 1, G: -14.03, F: -14.03, I: 44.94, H: 1, K: 24.68, M: 1, L: 1, N: 1, Q: -6.54, P: -1.88, S: 1, R: 1, T: -7.49, W: -9.37, V: 1, Y: 1 },
  Q: { A: 1, C: -6.54, E: 20.26, D: 20.26, G: 1, F: -6.54, I: 1, H: 1, K: 1, M: 1, L: 1, N: 1, Q: 20.26, P: 20.26, S: 44.94, R: 1, T: 1, W: 1, V: -6.54, Y: -6.54 },
  P: { A: 20.26, C: -6.54, E: 18.38, D: -6.54, G: 1, F: 20.26, I: 1, H: 1, K: 1, M: -6.54, L: 1, N: 1, Q: 20.26, P: 20.26, S: 20.26, R: -6.54, T: 1, W: -1.88, V: 20.26, Y: 1 },
  S: { A: 1, C: 33.6, E: 20.26, D: 1, G: 1, F: 1, I: 1, H: 1, K: 1, M: 1, L: 1, N: 1, Q: 20.26, P: 44.94, S: 20.26, R: 20.26, T: 1, W: 1, V: 1, Y: 1 },
  R: { A: 1, C: 1, E: 1, D: 1, G: -7.49, F: 1, I: 1, H: 20.26, K: 1, M: 1, L: 1, N: 13.34, Q: 20.26, P: 20.26, S: 44.94, R: 58.28, T: 1, W: 58.28, V: 1, Y: -6.54 },
  T: { A: 1, C: 1, E: 20.26, D: 1, G: -7.49, F: 13.34, I: 1, H: 1, K: 1, M: 1, L: 1, N: -14.03, Q: -6.54, P: 1, S: 1, R: 1, T: 1, W: -14.03, V: 1, Y: 1 },
  W: { A: -14.03, C: 1, E: 1, D: 1, G: -9.37, F: 1, I: 1, H: 24.68, K: 1, M: 24.68, L: 13.34, N: 13.34, Q: 1, P: 1, S: 1, R: 1, T: -14.03, W: 1, V: -7.49, Y: 1 },
  V: { A: 1, C: 1, E: 1, D: -14.03, G: -7.49, F: 1, I: 1, H: 1, K: -1.88, M: 1, L: 1, N: 1, Q: 1, P: 20.26, S: 1, R: 1, T: -7.49, W: 1, V: 1, Y: -6.54 },
  Y: { A: 24.68, C: 1, E: -6.54, D: 24.68, G: -7.49, F: 1, I: 1, H: 13.34, K: 1, M: 44.94, L: 1, N: 1, Q: 1, P: 13.34, S: 1, R: -15.91, T: -7.49, W: -9.37, V: 1, Y: 13.34 },
};

/** Sharp & Li 1987 E. coli CAI w (BioPython SharpEcoliIndex). */
export const W_ECOLI: Record<string, number> = {
  GCA: 0.586, GCC: 0.122, GCG: 0.424, GCT: 1, AGA: 0.004, AGG: 0.002, CGA: 0.004,
  CGC: 0.356, CGG: 0.004, CGT: 1, AAC: 1, AAT: 0.051, GAC: 1, GAT: 0.434, TGC: 1,
  TGT: 0.5, CAA: 0.124, CAG: 1, GAA: 1, GAG: 0.259, GGA: 0.01, GGC: 0.724, GGG: 0.019,
  GGT: 1, CAC: 1, CAT: 0.291, ATA: 0.003, ATC: 1, ATT: 0.185, CTA: 0.007, CTC: 0.037,
  CTG: 1, CTT: 0.042, TTA: 0.02, TTG: 0.02, AAA: 1, AAG: 0.253, ATG: 1, TTC: 1,
  TTT: 0.296, CCA: 0.135, CCC: 0.012, CCG: 1, CCT: 0.07, AGC: 0.41, AGT: 0.085,
  TCA: 0.077, TCC: 0.744, TCG: 0.017, TCT: 1, ACA: 0.076, ACC: 1, ACG: 0.099,
  ACT: 0.965, TGG: 1, TAC: 1, TAT: 0.239, GTA: 0.495, GTC: 0.066, GTG: 0.221, GTT: 1,
  TAA: 1, TAG: 0.033, TGA: 0.078,
};

/** Pichia / S. cerevisiae-like highly expressed w. */
export const W_PICHIA: Record<string, number> = {
  GCA: 0.5, GCC: 0.31, GCG: 0.11, GCT: 1, AGA: 1, AGG: 0.16, CGA: 0.05, CGC: 0.06,
  CGG: 0.04, CGT: 0.32, AAC: 1, AAT: 0.41, GAC: 0.67, GAT: 1, TGC: 0.43, TGT: 1,
  CAA: 1, CAG: 0.22, GAA: 1, GAG: 0.19, GGA: 0.22, GGC: 0.22, GGG: 0.12, GGT: 1,
  CAC: 0.64, CAT: 1, ATA: 0.23, ATC: 0.52, ATT: 1, CTA: 0.23, CTC: 0.11, CTG: 0.18,
  CTT: 0.17, TTA: 0.49, TTG: 1, AAA: 1, AAG: 0.73, ATG: 1, TTC: 1, TTT: 0.59,
  CCA: 1, CCC: 0.15, CCG: 0.12, CCT: 0.31, AGC: 0.16, AGT: 0.25, TCA: 0.29, TCC: 0.42,
  TCG: 0.1, TCT: 1, ACA: 0.3, ACC: 0.47, ACG: 0.14, ACT: 1, TGG: 1, TAC: 1, TAT: 0.56,
  GTA: 0.21, GTC: 0.42, GTG: 0.19, GTT: 1, TAA: 1, TAG: 0.2, TGA: 0.2,
};

/** Human highly expressed relative adaptiveness (Kazusa-style). */
export const W_HUMAN: Record<string, number> = {
  GCA: 0.5, GCC: 1, GCG: 0.28, GCT: 0.64, AGA: 0.26, AGG: 0.28, CGA: 0.27, CGC: 0.83,
  CGG: 0.51, CGT: 0.17, AAC: 1, AAT: 0.46, GAC: 1, GAT: 0.46, TGC: 1, TGT: 0.45,
  CAA: 0.26, CAG: 1, GAA: 0.42, GAG: 1, GGA: 0.25, GGC: 1, GGG: 0.32, GGT: 0.18,
  CAC: 1, CAT: 0.42, ATA: 0.16, ATC: 1, ATT: 0.35, CTA: 0.14, CTC: 0.48, CTG: 1,
  CTT: 0.25, TTA: 0.14, TTG: 0.25, AAA: 0.42, AAG: 1, ATG: 1, TTC: 1, TTT: 0.43,
  CCA: 0.52, CCC: 1, CCG: 0.34, CCT: 0.53, AGC: 0.87, AGT: 0.3, TCA: 0.25, TCC: 0.8,
  TCG: 0.17, TCT: 0.48, ACA: 0.46, ACC: 1, ACG: 0.28, ACT: 0.44, TGG: 1, TAC: 1,
  TAT: 0.43, GTA: 0.16, GTC: 0.46, GTG: 1, GTT: 0.25, TAA: 0.47, TAG: 0.23, TGA: 1,
};

export const AA_CODONS: Record<string, string[]> = {
  A: ["GCT", "GCC", "GCA", "GCG"],
  R: ["CGT", "CGC", "CGA", "CGG", "AGA", "AGG"],
  N: ["AAT", "AAC"],
  D: ["GAT", "GAC"],
  C: ["TGT", "TGC"],
  Q: ["CAA", "CAG"],
  E: ["GAA", "GAG"],
  G: ["GGT", "GGC", "GGA", "GGG"],
  H: ["CAT", "CAC"],
  I: ["ATT", "ATC", "ATA"],
  L: ["TTA", "TTG", "CTT", "CTC", "CTA", "CTG"],
  K: ["AAA", "AAG"],
  M: ["ATG"],
  F: ["TTT", "TTC"],
  P: ["CCT", "CCC", "CCA", "CCG"],
  S: ["TCT", "TCC", "TCA", "TCG", "AGT", "AGC"],
  T: ["ACT", "ACC", "ACA", "ACG"],
  W: ["TGG"],
  Y: ["TAT", "TAC"],
  V: ["GTT", "GTC", "GTA", "GTG"],
  "*": ["TAA", "TAG", "TGA"],
};

export const SITES: { name: string; seq: string }[] = [
  { name: "EcoRI", seq: "GAATTC" },
  { name: "BamHI", seq: "GGATCC" },
  { name: "XhoI", seq: "CTCGAG" },
  { name: "NdeI", seq: "CATATG" },
  { name: "NcoI", seq: "CCATGG" },
  { name: "HindIII", seq: "AAGCTT" },
  { name: "NotI", seq: "GCGGCCGC" },
  { name: "XbaI", seq: "TCTAGA" },
  { name: "SpeI", seq: "ACTAGT" },
  { name: "PstI", seq: "CTGCAG" },
  { name: "SacI", seq: "GAGCTC" },
  { name: "KpnI", seq: "GGTACC" },
];
