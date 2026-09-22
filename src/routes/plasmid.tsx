import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { AppShell } from "@/components/app-shell";
import { DesignBar } from "@/components/design-bar";
import { PlasmidMap } from "@/components/plasmid-map";
import { Card } from "@/components/ui/card";
import { analyzeDesign } from "@/lib/engine";
import { useStudio } from "@/lib/studio-store";

export const Route = createFileRoute("/plasmid")({ component: PlasmidPage });

function PlasmidPage() {
  const constructId = useStudio((s) => s.constructId);
  const linkerId = useStudio((s) => s.linkerId);
  const host = useStudio((s) => s.host);
  const pH = useStudio((s) => s.pH);
  const customSeq = useStudio((s) => s.customSeq);
  const r = useMemo(
    () => analyzeDesign(constructId, linkerId, host, pH, customSeq),
    [constructId, linkerId, host, pH, customSeq],
  );

  return (
    <AppShell>
      <h1 className="font-display text-3xl">Map</h1>
      <p className="mt-1 text-sm text-muted">
        Insert length is the optimized CDS ({r.bp} bp), not a placeholder.
      </p>
      <Card className="mt-5">
        <DesignBar />
      </Card>
      <div className="mt-4">
        <PlasmidMap insertBp={r.bp} label={r.construct.name} />
      </div>
    </AppShell>
  );
}
