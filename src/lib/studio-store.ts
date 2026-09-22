import { create } from "zustand";
import type { ConstructId, HostId, LinkerId } from "@/lib/engine";

export type Lang = "fa" | "en";

interface StudioState {
  lang: Lang;
  constructId: ConstructId;
  linkerId: LinkerId;
  host: HostId;
  molId: string;
  pH: number;
  customSeq: string;
  setLang: (lang: Lang) => void;
  setConstruct: (id: ConstructId) => void;
  setLinker: (id: LinkerId) => void;
  setHost: (host: HostId) => void;
  setMol: (id: string) => void;
  setPh: (pH: number) => void;
  setCustomSeq: (s: string) => void;
}

export const useStudio = create<StudioState>()((set) => ({
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
  setCustomSeq: (customSeq) => set({ customSeq }),
}));
