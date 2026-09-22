import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { DesignBar } from "@/components/design-bar";
import { GcChart } from "@/components/spark";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LINKERS, analyzeDesign } from "@/lib/engine";
import { useStudio } from "@/lib/studio-store";

export const Route = createFileRoute("/linkers")({ component: CodonPage });

function CodonPage() {
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

  const linkerRank = useMemo(() => {
    return LINKERS.map((l) => {
      const x = analyzeDesign(constructId, l.id, host, pH, customSeq);
      return { id: l.id, name: l.name, cai: x.cai, vein: x.vein.total, ii: x.instability };
    }).sort((a, b) => b.vein - a.vein);
  }, [constructId, host, pH, customSeq]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(r.dna);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      /* ignore */
    }
  }

  return (
    <AppShell>
      <h1 className="font-display text-3xl">Codon engine</h1>
      <p className="mt-1 text-sm text-muted">
        Sharp–Li CAI, GC sliding window, rare-codon runs, restriction-site rewrite. Host retunes every codon.
      </p>
      <Card className="mt-5">
        <DesignBar />
      </Card>

      <div className="mt-4 grid gap-3 sm:grid-cols-4">
        {[
          ["CAI", r.cai.toFixed(3)],
          ["GC", `${(r.gc * 100).toFixed(1)}%`],
          ["Rare runs", String(r.rare.length)],
          ["Sites rewritten", r.avoided.length ? r.avoided.join(", ") : "none"],
        ].map(([k, v]) => (
          <Card key={k} className="p-3">
            <p className="text-[10px] text-muted uppercase">{k}</p>
            <p className="mt-1 font-mono text-sm tabular-nums">{v}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-4">
        <p className="text-xs text-muted">GC along CDS (36 bp window)</p>
        <GcChart data={r.gcTrack} />
      </Card>

      <Card className="mt-4">
        <p className="text-xs text-muted">Linker sweep — same construct, this host, ranked by VEIN</p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-muted">
              <tr>
                <th className="pb-2 font-medium">Linker</th>
                <th className="pb-2 font-medium">VEIN</th>
                <th className="pb-2 font-medium">CAI</th>
                <th className="pb-2 font-medium">II</th>
              </tr>
            </thead>
            <tbody className="font-mono tabular-nums">
              {linkerRank.map((row) => (
                <tr key={row.id} className={row.id === linkerId ? "text-accent" : "text-fg"}>
                  <td className="py-1.5">{row.name}</td>
                  <td>{row.vein.toFixed(1)}</td>
                  <td>{row.cai.toFixed(3)}</td>
                  <td>{row.ii.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="mt-4">
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted">Optimized CDS</p>
          <Button size="sm" variant="outline" onClick={() => void copy()}>
            {copied ? "Copied" : "Copy DNA"}
          </Button>
        </div>
        <pre className="mt-3 max-h-64 overflow-auto whitespace-pre-wrap break-all font-mono text-[11px] leading-relaxed">
          {r.dna}
        </pre>
      </Card>
    </AppShell>
  );
}
