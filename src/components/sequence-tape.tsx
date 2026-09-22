import { cn } from "@/lib/utils";

export function SequenceTape({
  blocks,
}: {
  blocks: { id: string; seq: string; kind: "domain" | "linker" | "tag" }[];
}) {
  const total = blocks.reduce((a, b) => a + b.seq.length, 0) || 1;
  return (
    <div className="space-y-2">
      <div className="flex h-4 overflow-hidden rounded-full bg-elevated">
        {blocks.map((b) => (
          <div
            key={b.id}
            title={`${b.id} ${b.seq.length}`}
            className={cn(
              "h-full",
              b.kind === "domain" && "bg-domain-a",
              b.kind === "linker" && "bg-accent",
              b.kind === "tag" && "bg-domain-c",
            )}
            style={{ width: `${(b.seq.length / total) * 100}%` }}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-2 text-[10px] text-muted">
        {blocks.map((b) => (
          <span key={b.id} className="font-mono">
            {b.id}:{b.seq.length}
          </span>
        ))}
      </div>
    </div>
  );
}

export function CompBars({ data }: { data: { aa: string; n: number; f: number }[] }) {
  const max = Math.max(...data.map((d) => d.f), 0.001);
  return (
    <div className="grid grid-cols-10 gap-1">
      {data.map((d) => (
        <div key={d.aa} className="flex flex-col items-center gap-1">
          <div className="flex h-12 w-full items-end rounded-sm bg-elevated">
            <div
              className="w-full rounded-sm bg-accent"
              style={{ height: `${(d.f / max) * 100}%` }}
            />
          </div>
          <span className="font-mono text-[9px] text-muted">{d.aa}</span>
        </div>
      ))}
    </div>
  );
}
