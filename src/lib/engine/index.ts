import {
  CONSTRUCTS,
  DOMAINS,
  LINKERS,
  assembleFusion,
  type ConstructId,
  type HostId,
  type LinkerId,
} from "./constructs";
import {
  aggregationHotspots,
  aliphaticIndex,
  caiOf,
  chargeAtPh,
  chargeCurve,
  chouFasman,
  compositionBars,
  disorderFraction,
  extinction280,
  findSites,
  flexibilityMean,
  gcContent,
  gcWindow,
  gravy,
  hydropathyWindow,
  instabilityIndex,
  isoelectricPoint,
  molecularWeight,
  optimizeDna,
  proteaseMotifs,
  rareCodonRuns,
  veinScore,
} from "./compute";

export * from "./constructs";
export * from "./compute";
export * from "./molecule";

export function analyzeDesign(
  constructId: ConstructId,
  linkerId: LinkerId,
  host: HostId,
  pH = 7.4,
  customSeq?: string,
) {
  const construct = CONSTRUCTS.find((c) => c.id === constructId)!;
  const linker = LINKERS.find((l) => l.id === linkerId)!;
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
    domainCount: custom ? 1 : construct.domains.length,
  });
  const hosts = (["ecoli", "pichia", "human"] as HostId[]).map((h) => {
    const d = optimizeDna(seq, h).dna;
    return { host: h, cai: caiOf(d, h), gc: gcContent(d) };
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
    kDa: mw / 1000,
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
    linkerFlex: flexibilityMean(custom ? seq.slice(0, 24) : linker.sequence),
  };
}

export type DesignReport = ReturnType<typeof analyzeDesign>;

export function sweepVein(constructId: ConstructId, customSeq?: string) {
  const hosts: HostId[] = ["ecoli", "pichia", "human"];
  return LINKERS.map((l) => ({
    linkerId: l.id,
    name: l.name,
    cells: hosts.map((h) => ({
      host: h,
      vein: analyzeDesign(constructId, l.id, h, 7.4, customSeq).vein.total,
    })),
  }));
}
