import {
  AA_CODONS,
  DIWV,
  FLEX,
  KD,
  PKA,
  RESIDUE_MW,
  SITES,
  W_ECOLI,
  W_HUMAN,
  W_PICHIA,
} from "./tables";
import type { HostId } from "./constructs";

export function countAa(seq: string): Record<string, number> {
  const c: Record<string, number> = {};
  for (const a of seq) c[a] = (c[a] ?? 0) + 1;
  return c;
}

export function molecularWeight(seq: string): number {
  if (!seq.length) return 0;
  let sum = 0;
  for (const a of seq) sum += RESIDUE_MW[a] ?? 0;
  return sum - (seq.length - 1) * 18.01528;
}

export function gravy(seq: string): number {
  if (!seq.length) return 0;
  let s = 0;
  for (const a of seq) s += KD[a] ?? 0;
  return s / seq.length;
}

export function aliphaticIndex(seq: string): number {
  const n = seq.length || 1;
  const A = (seq.match(/A/g) ?? []).length / n;
  const V = (seq.match(/V/g) ?? []).length / n;
  const I = (seq.match(/I/g) ?? []).length / n;
  const L = (seq.match(/L/g) ?? []).length / n;
  return 100 * (A + 2.9 * V + 3.9 * (I + L));
}

export function extinction280(seq: string): number {
  const W = (seq.match(/W/g) ?? []).length;
  const Y = (seq.match(/Y/g) ?? []).length;
  const C = (seq.match(/C/g) ?? []).length;
  return W * 5500 + Y * 1490 + C * 125;
}

export function instabilityIndex(seq: string): number {
  if (seq.length < 2) return 0;
  let sum = 0;
  for (let i = 0; i < seq.length - 1; i++) {
    sum += DIWV[seq[i]]?.[seq[i + 1]] ?? 1;
  }
  return (10 / seq.length) * sum;
}

export function flexibilityMean(seq: string): number {
  if (!seq.length) return 1;
  let s = 0;
  for (const a of seq) s += FLEX[a] ?? 1;
  return s / seq.length;
}

export function chargeAtPh(seq: string, pH: number): number {
  const n = seq.length;
  if (!n) return 0;
  const pos = (pKa: number) => 1 / (1 + 10 ** (pH - pKa));
  const neg = (pKa: number) => -1 / (1 + 10 ** (pKa - pH));
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

export function isoelectricPoint(seq: string): number {
  let lo = 0;
  let hi = 14;
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    if (chargeAtPh(seq, mid) > 0) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

export function hydropathyWindow(seq: string, win = 9): { i: number; kd: number }[] {
  const w = Math.max(3, win);
  const half = Math.floor(w / 2);
  const out: { i: number; kd: number }[] = [];
  for (let i = 0; i < seq.length; i++) {
    let s = 0;
    let n = 0;
    for (let j = i - half; j <= i + half; j++) {
      if (j < 0 || j >= seq.length) continue;
      s += KD[seq[j]] ?? 0;
      n++;
    }
    out.push({ i: i + 1, kd: n ? s / n : 0 });
  }
  return out;
}

export function aggregationHotspots(seq: string, win = 6): { start: number; end: number; gravy: number }[] {
  const hits: { start: number; end: number; gravy: number }[] = [];
  for (let i = 0; i <= seq.length - win; i++) {
    const chunk = seq.slice(i, i + win);
    if (/[PKRDE]/.test(chunk)) continue;
    const g = gravy(chunk);
    if (g >= 1.5) hits.push({ start: i + 1, end: i + win, gravy: g });
  }
  const merged: typeof hits = [];
  for (const h of hits) {
    const last = merged[merged.length - 1];
    if (last && h.start <= last.end + 1) last.end = Math.max(last.end, h.end);
    else merged.push({ ...h });
  }
  return merged;
}

export function disorderFraction(seq: string, win = 21): number {
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
    if (c && score / c > 0.25) n++;
  }
  return n / seq.length;
}

export function gcContent(dna: string): number {
  if (!dna.length) return 0;
  const gc = (dna.match(/[GC]/g) ?? []).length;
  return gc / dna.length;
}

export function weightsFor(host: HostId): Record<string, number> {
  if (host === "pichia") return W_PICHIA;
  if (host === "human") return W_HUMAN;
  return W_ECOLI;
}

export function caiOf(dna: string, host: HostId): number {
  const wtab = weightsFor(host);
  const codons = dna.match(/.{1,3}/g) ?? [];
  const usable = codons.filter((c) => c.length === 3 && c !== "TAA" && c !== "TAG" && c !== "TGA");
  if (!usable.length) return 0;
  let log = 0;
  for (const c of usable) {
    const w = Math.max(wtab[c] ?? 0.001, 0.001);
    log += Math.log(w);
  }
  return Math.exp(log / usable.length);
}

export function bestCodon(aa: string, host: HostId, forbidden?: Set<string>): string {
  const wtab = weightsFor(host);
  const opts = [...(AA_CODONS[aa] ?? ["NNN"])].sort((a, b) => (wtab[b] ?? 0) - (wtab[a] ?? 0));
  if (!forbidden) return opts[0] ?? "NNN";
  for (const c of opts) {
    if (![...forbidden].some((f) => c.includes(f))) return c;
  }
  return opts[0] ?? "NNN";
}

export function optimizeDna(seq: string, host: HostId): { dna: string; avoided: string[] } {
  let dna = "";
  for (const aa of seq) dna += bestCodon(aa, host);
  dna += bestCodon("*", host);
  const hit = new Set<string>();
  for (let pass = 0; pass < 4; pass++) {
    let changed = false;
    for (const site of SITES) {
      let idx = dna.indexOf(site.seq);
      while (idx >= 0) {
        hit.add(site.name);
        const codonI = Math.floor(idx / 3);
        const aa = seq[codonI];
        if (aa) {
          const alts = [...(AA_CODONS[aa] ?? [])].sort(
            (a, b) => (weightsFor(host)[b] ?? 0) - (weightsFor(host)[a] ?? 0),
          );
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
  return { dna, avoided: [...hit] };
}

export function findSites(dna: string): { name: string; pos: number }[] {
  const out: { name: string; pos: number }[] = [];
  for (const s of SITES) {
    let i = dna.indexOf(s.seq);
    while (i >= 0) {
      out.push({ name: s.name, pos: i + 1 });
      i = dna.indexOf(s.seq, i + 1);
    }
  }
  return out;
}

export function rareCodonRuns(dna: string, host: HostId, thresh = 0.2): { start: number; end: number }[] {
  const wtab = weightsFor(host);
  const codons = dna.match(/.{3}/g) ?? [];
  const rare = codons.map((c) => (wtab[c] ?? 0) < thresh);
  const runs: { start: number; end: number }[] = [];
  let i = 0;
  while (i < rare.length) {
    if (!rare[i]) {
      i++;
      continue;
    }
    let j = i;
    while (j < rare.length && rare[j]) j++;
    if (j - i >= 3) runs.push({ start: i * 3 + 1, end: j * 3 });
    i = j;
  }
  return runs;
}

export function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

export function clamp01(x: number): number {
  return Math.min(1, Math.max(0, x));
}

export interface VeinBreakdown {
  V: number;
  E: number;
  I: number;
  N: number;
  total: number;
}

export function veinScore(input: {
  gravy: number;
  cai: number;
  gc: number;
  instability: number;
  aggFrac: number;
  linkerFlex: number;
  domainCount: number;
}): VeinBreakdown {
  const V = clamp01(sigmoid(-input.gravy * 1.6) * (1 - input.aggFrac));
  const gcScore = clamp01(1 - Math.abs(input.gc - 0.51) / 0.35);
  const E = clamp01(input.cai * gcScore);
  const I = clamp01(sigmoid((40 - input.instability) / 8));
  const N = clamp01((input.linkerFlex - 0.9) / 0.2) * clamp01(Math.log2(input.domainCount + 1) / 2);
  const total = 100 * (0.28 * V + 0.34 * E + 0.26 * I + 0.12 * N);
  return { V, E, I, N, total };
}

export function gcWindow(dna: string, win = 30): { i: number; gc: number }[] {
  const out: { i: number; gc: number }[] = [];
  const step = 9;
  for (let i = 0; i + win <= dna.length; i += step) {
    const chunk = dna.slice(i, i + win);
    out.push({ i: i + 1, gc: gcContent(chunk) });
  }
  return out;
}

export function chargeCurve(seq: string): { pH: number; q: number }[] {
  const out: { pH: number; q: number }[] = [];
  for (let pH = 3; pH <= 11.01; pH += 0.25) out.push({ pH, q: chargeAtPh(seq, pH) });
  return out;
}

const PA: Record<string, number> = {
  A: 1.42, R: 0.98, N: 0.67, D: 1.01, C: 0.7, Q: 1.11, E: 1.51, G: 0.57, H: 1.0,
  I: 1.08, L: 1.21, K: 1.16, M: 1.45, F: 1.13, P: 0.57, S: 0.77, T: 0.83, W: 1.08,
  Y: 0.69, V: 1.06,
};
const PB: Record<string, number> = {
  A: 0.83, R: 0.93, N: 0.89, D: 0.54, C: 1.19, Q: 1.1, E: 0.37, G: 0.75, H: 0.87,
  I: 1.6, L: 1.3, K: 0.74, M: 1.05, F: 1.38, P: 0.55, S: 0.75, T: 1.19, W: 1.37,
  Y: 1.47, V: 1.7,
};

export function chouFasman(seq: string): { helix: number; sheet: number; coil: number } {
  if (!seq.length) return { helix: 0, sheet: 0, coil: 1 };
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
  return { helix, sheet, coil: Math.max(0, 1 - helix - sheet) };
}

export function proteaseMotifs(seq: string): { name: string; pos: number }[] {
  const out: { name: string; pos: number }[] = [];
  for (let i = 0; i < seq.length; i++) {
    const a = seq[i];
    if ((a === "K" || a === "R") && seq[i + 1] !== "P") out.push({ name: "trypsin", pos: i + 1 });
  }
  let i = seq.indexOf("ENLYFQ");
  while (i >= 0) {
    out.push({ name: "TEV", pos: i + 1 });
    i = seq.indexOf("ENLYFQ", i + 1);
  }
  i = seq.indexOf("LVPRGS");
  while (i >= 0) {
    out.push({ name: "thrombin", pos: i + 1 });
    i = seq.indexOf("LVPRGS", i + 1);
  }
  return out;
}

export function compositionBars(seq: string): { aa: string; n: number; f: number }[] {
  const c = countAa(seq);
  const n = seq.length || 1;
  return "ACDEFGHIKLMNPQRSTVWY".split("").map((aa) => ({
    aa,
    n: c[aa] ?? 0,
    f: (c[aa] ?? 0) / n,
  }));
}

