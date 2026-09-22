import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { AppShell } from "@/components/app-shell";
import { DesignBar } from "@/components/design-bar";
import { Card } from "@/components/ui/card";
import { MOLECULES, analyzeDesign, complementScore, molProps } from "@/lib/engine";
import { useStudio } from "@/lib/studio-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/archive")({ component: LigandPage });

function LigandPage() {
  const constructId = useStudio((s) => s.constructId);
  const linkerId = useStudio((s) => s.linkerId);
  const host = useStudio((s) => s.host);
  const pH = useStudio((s) => s.pH);
  const customSeq = useStudio((s) => s.customSeq);
  const molId = useStudio((s) => s.molId);
  const setMol = useStudio((s) => s.setMol);
  const r = useMemo(
    () => analyzeDesign(constructId, linkerId, host, pH, customSeq),
    [constructId, linkerId, host, pH, customSeq],
  );

  const rows = useMemo(() => {
    return MOLECULES.map((m) => {
      const p = molProps(m.smiles);
      return { m, p, score: complementScore(p, r.gravy, r.pi) };
    }).sort((a, b) => b.score - a.score);
  }, [r.gravy, r.pi]);

  const selected = rows.find((x) => x.m.id === molId) ?? rows[0];

  return (
    <AppShell>
      <h1 className="font-display text-3xl">Ligand complement</h1>
      <p className="mt-1 text-sm text-muted">
        Lipinski / QED-style scoring against the live protein GRAVY and pI. Not a docking run.
      </p>
      <Card className="mt-5">
        <DesignBar />
      </Card>

      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {rows.map(({ m, p, score }) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMol(m.id)}
            className={cn(
              "rounded-[var(--radius-md)] border p-3 text-start",
              molId === m.id ? "border-accent/50 bg-elevated" : "border-border bg-surface",
            )}
          >
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-sm font-medium">{m.name}</span>
              <span className="font-mono text-xs tabular-nums text-accent">{score.toFixed(1)}</span>
            </div>
            <p className="mt-1 text-[11px] text-muted">{m.note}</p>
            <p className="mt-2 font-mono text-[10px] text-subtle">
              MW {p.mw.toFixed(0)} · logP {p.logP.toFixed(2)} · Lip {p.lipinski}
            </p>
          </button>
        ))}
      </div>

      {selected ? (
        <Card className="mt-4">
          <h2 className="font-display text-xl">{selected.m.name}</h2>
          <p className="mt-2 break-all font-mono text-[11px] text-muted">{selected.m.smiles}</p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["MW", selected.p.mw.toFixed(1)],
              ["logP", selected.p.logP.toFixed(2)],
              ["HBD / HBA", `${selected.p.hbd} / ${selected.p.hba}`],
              ["TPSA", selected.p.tpsa.toFixed(0)],
              ["QED-like", selected.p.qed.toFixed(3)],
              ["Lipinski fails", String(selected.p.lipinski)],
              ["Complement", selected.score.toFixed(1)],
              ["vs GRAVY", r.gravy.toFixed(3)],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="text-[10px] text-muted uppercase">{k}</p>
                <p className="font-mono text-sm tabular-nums">{v}</p>
              </div>
            ))}
          </div>
        </Card>
      ) : null}
    </AppShell>
  );
}
