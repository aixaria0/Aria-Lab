import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { DesignBar } from "@/components/design-bar";
import { CompBars, SequenceTape } from "@/components/sequence-tape";
import { ChargeChart, GcChart, HydroChart } from "@/components/spark";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { VeinHeatmap } from "@/components/vein-heatmap";
import { rankDesign } from "@/lib/ask-vein";
import {
  MOLECULES,
  analyzeDesign,
  complementScore,
  molProps,
  sweepVein,
} from "@/lib/engine";
import { useStudio } from "@/lib/studio-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Dashboard });

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

  const r = useMemo(
    () => analyzeDesign(constructId, linkerId, host, pH, customSeq),
    [constructId, linkerId, host, pH, customSeq],
  );
  const heat = useMemo(() => sweepVein(constructId, customSeq), [constructId, customSeq]);
  const ligands = useMemo(() => {
    return MOLECULES.map((m) => {
      const p = molProps(m.smiles);
      return { m, p, score: complementScore(p, r.gravy, r.pi) };
    }).sort((a, b) => b.score - a.score);
  }, [r.gravy, r.pi]);

  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState(customSeq);

  async function rank() {
    setBusy(true);
    setNote("");
    const summary = JSON.stringify({
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
      sheet: +r.ss.sheet.toFixed(3),
    });
    const out = await rankDesign({ data: { summary } });
    setNote(out.ok ? out.text : out.error);
    setBusy(false);
  }

  const kpis = [
    { k: "MW", v: `${r.kDa.toFixed(2)} kDa` },
    { k: "pI", v: r.pi.toFixed(2) },
    { k: `z@${pH.toFixed(1)}`, v: r.charge.toFixed(2) },
    { k: "GRAVY", v: r.gravy.toFixed(3) },
    { k: "II", v: r.instability.toFixed(1) },
    { k: "CAI", v: r.cai.toFixed(3) },
    { k: "GC", v: `${(r.gc * 100).toFixed(1)}%` },
    { k: "ε280", v: r.extinction.toLocaleString() },
    { k: "aa", v: String(r.aa) },
    { k: "bp", v: String(r.bp) },
    { k: "helix", v: `${(r.ss.helix * 100).toFixed(0)}%` },
    { k: "sheet", v: `${(r.ss.sheet * 100).toFixed(0)}%` },
  ];

  return (
    <AppShell>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-medium tracking-[0.22em] text-muted uppercase">
            Computational core
          </p>
          <h1 className="font-display text-3xl md:text-4xl">VEIN</h1>
          <p className="mt-1 font-mono text-xs text-muted">
            {r.custom ? "custom FASTA" : r.construct.name} · {r.linker.name} · {host} · pH {pH.toFixed(1)}
          </p>
        </div>
        <div className="text-end">
          <p className="text-[11px] tracking-wide text-muted uppercase">Score</p>
          <p className="font-mono text-6xl tabular-nums leading-none text-accent">
            {r.vein.total.toFixed(1)}
          </p>
        </div>
      </div>

      <Card className="mt-5">
        <DesignBar />
        <label className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          <span className="w-20 shrink-0 text-xs font-medium tracking-wide text-muted uppercase">
            pH
          </span>
          <input
            type="range"
            min={4}
            max={10}
            step={0.1}
            value={pH}
            onChange={(e) => setPh(Number(e.target.value))}
            className="h-11 w-full accent-[var(--color-accent)]"
          />
          <span className="w-12 font-mono text-sm tabular-nums">{pH.toFixed(1)}</span>
        </label>
      </Card>

      <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-12">
        {kpis.map((x) => (
          <div key={x.k} className="rounded-[var(--radius-md)] border border-border bg-surface p-2.5">
            <p className="text-[10px] tracking-wide text-muted uppercase">{x.k}</p>
            <p className="mt-1 font-mono text-[13px] tabular-nums text-fg">{x.v}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
        <Card>
          <p className="mb-3 text-[11px] text-muted">
            Linker × host sweep — click a cell to retune the live ORF
          </p>
          <VeinHeatmap
            rows={heat}
            activeLinker={linkerId}
            activeHost={host}
            onPick={(l, h) => {
              setLinker(l);
              setHost(h);
            }}
          />
        </Card>
        <div className="grid gap-3">
          {(
            [
              ["V value", r.vein.V, "solubility vs GRAVY and hydrophobic stretches"],
              ["E expression", r.vein.E, "CAI × GC window for the selected host"],
              ["I integrity", r.vein.I, "Guruprasad dipeptide instability"],
              ["N novelty", r.vein.N, "linker flexibility × architecture"],
            ] as const
          ).map(([k, v, hint]) => (
            <Card key={k} className="p-3">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-muted">{k}</span>
                <span className="font-mono text-sm tabular-nums">{(v * 100).toFixed(0)}</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-elevated">
                <div className="h-full bg-accent" style={{ width: `${v * 100}%` }} />
              </div>
              <p className="mt-1 text-[10px] text-subtle">{hint}</p>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-3">
        <Card>
          <p className="text-[11px] text-muted">Kyte–Doolittle w=9</p>
          <HydroChart data={r.hydro} />
        </Card>
        <Card>
          <p className="text-[11px] text-muted">Henderson–Hasselbalch charge</p>
          <ChargeChart data={r.titration} />
        </Card>
        <Card>
          <p className="text-[11px] text-muted">GC on optimized CDS</p>
          <GcChart data={r.gcTrack} />
        </Card>
      </div>

      <Card className="mt-3">
        <p className="mb-2 text-[11px] text-muted">Architecture tape</p>
        <SequenceTape blocks={r.custom ? [{ id: "custom", seq: r.seq, kind: "domain" }] : r.fusion.blocks} />
        <p className="mt-4 text-[11px] text-muted">Residue composition</p>
        <div className="mt-2">
          <CompBars data={r.comp} />
        </div>
      </Card>

      <div className="mt-3 grid gap-3 lg:grid-cols-3">
        <Card>
          <p className="text-[11px] text-muted">Aggregation hotspots (KD ≥ 1.5, no PKRDE)</p>
          {r.hotspots.length === 0 ? (
            <p className="mt-2 font-mono text-xs text-fg">none</p>
          ) : (
            <ul className="mt-2 max-h-40 space-y-1 overflow-auto font-mono text-[11px]">
              {r.hotspots.slice(0, 12).map((h) => (
                <li key={`${h.start}-${h.end}`}>
                  {h.start}–{h.end} · {h.gravy.toFixed(2)}
                </li>
              ))}
            </ul>
          )}
          <p className="mt-3 text-[11px] text-muted">
            disorder {(r.disorder * 100).toFixed(1)}% · aliphatic {r.aliphatic.toFixed(1)} · rare codon
            runs {r.rare.length}
          </p>
        </Card>
        <Card>
          <p className="text-[11px] text-muted">Restriction remaining after rewrite</p>
          {r.sites.length === 0 ? (
            <p className="mt-2 font-mono text-xs">cleared</p>
          ) : (
            <ul className="mt-2 max-h-40 space-y-1 overflow-auto font-mono text-[11px]">
              {r.sites.slice(0, 16).map((s, i) => (
                <li key={`${s.name}-${s.pos}-${i}`}>
                  {s.name} @ {s.pos}
                </li>
              ))}
            </ul>
          )}
          <p className="mt-3 text-[11px] text-muted">
            rewritten: {r.avoided.length ? r.avoided.join(", ") : "—"}
          </p>
          <p className="mt-1 text-[11px] text-muted">
            protease motifs {r.protease.filter((p) => p.name !== "trypsin").length} named · trypsin{" "}
            {r.protease.filter((p) => p.name === "trypsin").length}
          </p>
        </Card>
        <Card>
          <p className="text-[11px] text-muted">Ligand complement vs live GRAVY / pI</p>
          <div className="mt-2 space-y-1">
            {ligands.slice(0, 6).map(({ m, score }) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMol(m.id)}
                className={cn(
                  "flex w-full items-center justify-between rounded-[8px] px-2 py-1.5 text-start text-xs",
                  molId === m.id ? "bg-elevated text-fg" : "text-muted hover:text-fg",
                )}
              >
                <span>{m.name}</span>
                <span className="font-mono tabular-nums text-accent">{score.toFixed(1)}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <p className="text-[11px] text-muted">
            Paste FASTA or raw AA (≥12 residues) to override the UniProt fusion
          </p>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            spellCheck={false}
            rows={5}
            className="mt-2 w-full rounded-[var(--radius-sm)] border border-border bg-bg p-3 font-mono text-[11px] text-fg outline-none focus:ring-2 focus:ring-accent/50"
            placeholder=">custom\nMKT..."
          />
          <div className="mt-2 flex flex-wrap gap-2">
            <Button
              size="sm"
              onClick={() => setCustomSeq(draft)}
            >
              Compute sequence
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setDraft("");
                setCustomSeq("");
              }}
            >
              Clear to construct
            </Button>
          </div>
        </Card>
        <Card>
          <p className="text-[11px] text-muted">Grok critic — numeric report only, on demand</p>
          <Button className="mt-3 w-full" disabled={busy} onClick={() => void rank()}>
            {busy ? "Scoring…" : "Rank this design"}
          </Button>
          {note ? (
            <p className="mt-3 text-sm leading-relaxed text-muted">{note}</p>
          ) : (
            <p className="mt-3 text-[11px] text-subtle">Does not run on load. No wet-lab recipe.</p>
          )}
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            {r.hosts.map((h) => (
              <div key={h.host} className={cn("rounded-[8px] bg-elevated p-2", h.host === host && "ring-1 ring-accent/40")}>
                <p className="text-[10px] text-muted">{h.host}</p>
                <p className="font-mono text-sm tabular-nums">{h.cai.toFixed(3)}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
