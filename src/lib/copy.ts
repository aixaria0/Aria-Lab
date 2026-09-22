import type { Lang } from "./studio-store";

const dict = {
  app: { en: "ARIA Lab", fa: "آزمایشگاه آریا" },
  navHome: { en: "VEIN", fa: "VEIN" },
  navConstructs: { en: "Sequence", fa: "توالی" },
  navLinkers: { en: "Codon", fa: "کدون" },
  navPlasmid: { en: "Map", fa: "نقشه" },
  navArchive: { en: "Ligand", fa: "لیگاند" },
  disclaimer: {
    en: "In-silico engine. UniProt domains + ProtParam/CAI. Not a synthesis order.",
    fa: "موتور in-silico. دامنه‌های UniProt و ProtParam/CAI. سفارش سنتز نیست.",
  },
} as const;

export function t(lang: Lang, key: keyof typeof dict): string {
  return dict[key][lang];
}
