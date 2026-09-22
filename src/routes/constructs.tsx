import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { DesignBar } from "@/components/design-bar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { analyzeDesign } from "@/lib/engine";
import { useStudio } from "@/lib/studio-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/constructs")({ component: SequencePage });

function SequencePage() {
  const constructId = useStudio((s) => s.constructId);
  const linkerId = useStudio((s) => s.linkerId);
  const host = useStudio((s) => s.host);
  const pH = useStudio((s) => s.pH);
  const customSeq = useStudio((s) => s.customSeq);
  const r = useMemo(
    () => analyzeDesign(constructId, linkerId, host, pH, customSeq),
    [constructId, linkerId, host, pH, customSeq],
  );
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(`>${r.construct.name}|${r.linker.name}|${r.aa}aa\n${r.seq}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      /* ignore */
    }
  }

  return (
    <AppShell>
      <h1 className="font-display text-3xl">Assembled ORF</h1>
      <p className="mt-1 text-sm text-muted">
        UniProt slices joined with the live linker + TEV + 6×His. Length and composition are computed.
      </p>
      <Card className="mt-5">
        <DesignBar />
      </Card>

      <div className="mt-4 flex flex-wrap gap-2">
        {r.fusion.blocks.map((b) => (
          <span
            key={b.id}
            className={cn(
              "rounded-full px-3 py-1 font-mono text-[11px]",
              b.kind === "domain" && "bg-elevated text-fg",
              b.kind === "linker" && "bg-accent/20 text-accent",
              b.kind === "tag" && "border border-border text-muted",
            )}
          >
            {b.id} {b.seq.length}
          </span>
        ))}
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {r.domains.map((d) => (
          <Card key={d.id}>
            <p className="text-xs text-muted">
              {d.uniprot} {d.range}
            </p>
            <h2 className="mt-1 font-display text-lg">{d.name}</h2>
            <p className="mt-2 font-mono text-xs tabular-nums text-muted">{d.seq.length} aa</p>
          </Card>
        ))}
      </div>

      <Card className="mt-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-muted">FASTA · {r.aa} residues</p>
          <Button size="sm" variant="outline" onClick={() => void copy()}>
            {copied ? "Copied" : "Copy FASTA"}
          </Button>
        </div>
        <pre className="mt-3 max-h-80 overflow-auto whitespace-pre-wrap break-all font-mono text-[11px] leading-relaxed text-fg">
          {r.seq}
        </pre>
      </Card>
    </AppShell>
  );
}
