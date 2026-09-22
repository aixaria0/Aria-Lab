import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

interface Feat {
  id: string;
  name: string;
  start: number;
  end: number;
  type: "origin" | "marker" | "coding" | "regulatory" | "cloning";
}

function polar(cx: number, cy: number, r: number, deg: number) {
  const a = ((deg - 90) * Math.PI) / 180;
  return {
    x: Math.round((cx + r * Math.cos(a)) * 1000) / 1000,
    y: Math.round((cy + r * Math.sin(a)) * 1000) / 1000,
  };
}

function arcPath(start: number, end: number, total: number, r: number, cx: number, cy: number) {
  const a0 = (start / total) * 360;
  const a1 = (end / total) * 360;
  const sweep = Math.max(0.4, a1 - a0);
  const p0 = polar(cx, cy, r, a0);
  const p1 = polar(cx, cy, r, a0 + sweep);
  const large = sweep > 180 ? 1 : 0;
  return `M ${p0.x} ${p0.y} A ${r} ${r} 0 ${large} 1 ${p1.x} ${p1.y}`;
}

const TONES: Record<Feat["type"], string> = {
  origin: "var(--color-domain-b)",
  marker: "var(--color-domain-c)",
  coding: "var(--color-accent)",
  regulatory: "var(--color-domain-a)",
  cloning: "var(--color-muted)",
};

export function PlasmidMap({ insertBp, label }: { insertBp: number; label: string }) {
  const plasmid = useMemo(() => {
    const insertStart = 902;
    const insertEnd = insertStart + insertBp - 1;
    const termStart = insertEnd + 1;
    const termEnd = termStart + 99;
    const ampStart = termEnd + 1;
    const ampEnd = ampStart + 448;
    const features: Feat[] = [
      { id: "ori", name: "pUC ori", start: 1, end: 799, type: "origin" },
      { id: "mcs", name: "MCS", start: 800, end: 850, type: "cloning" },
      { id: "t7", name: "T7", start: 851, end: 901, type: "regulatory" },
      { id: "insert", name: `${label} CDS`, start: insertStart, end: insertEnd, type: "coding" },
      { id: "term", name: "Terminator", start: termStart, end: termEnd, type: "regulatory" },
      { id: "amp", name: "AmpR", start: ampStart, end: ampEnd, type: "marker" },
    ];
    return { total: ampEnd, features };
  }, [insertBp, label]);

  const [active, setActive] = useState("insert");
  const cx = 200;
  const cy = 200;
  const r = 132;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px]">
      <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-medium tracking-wide text-muted uppercase">pARIA</p>
          <p className="font-mono text-xs tabular-nums text-muted">{plasmid.total.toLocaleString()} bp</p>
        </div>
        <svg viewBox="0 0 400 400" className="mx-auto max-h-[420px] w-full" role="img">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--color-border)" strokeWidth="18" />
          {plasmid.features.map((f) => (
            <path
              key={f.id}
              d={arcPath(f.start, f.end, plasmid.total, r, cx, cy)}
              fill="none"
              stroke={TONES[f.type]}
              strokeWidth={active === f.id ? 22 : 16}
              className="cursor-pointer"
              onClick={() => setActive(f.id)}
            />
          ))}
          <circle cx={cx} cy={cy} r="86" fill="var(--color-bg)" />
          <text x={cx} y={cy - 6} textAnchor="middle" fill="var(--color-fg)" fontSize="14">
            pARIA
          </text>
          <text x={cx} y={cy + 14} textAnchor="middle" fill="var(--color-muted)" fontSize="11">
            {plasmid.total} bp
          </text>
        </svg>
        <div className="relative mt-4 h-8 overflow-hidden rounded-full bg-elevated">
          {plasmid.features.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setActive(f.id)}
              className="absolute top-0 h-full"
              style={{
                left: `${((f.start - 1) / plasmid.total) * 100}%`,
                width: `${((f.end - f.start + 1) / plasmid.total) * 100}%`,
                background: TONES[f.type],
                opacity: active === f.id ? 1 : 0.7,
              }}
            />
          ))}
        </div>
      </div>
      <div className="space-y-2">
        {plasmid.features.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setActive(f.id)}
            className={cn(
              "w-full rounded-[var(--radius-md)] border p-3 text-start",
              active === f.id ? "border-accent/50 bg-elevated" : "border-border bg-surface",
            )}
          >
            <div className="flex justify-between gap-2">
              <span className="text-sm">{f.name}</span>
              <span className="font-mono text-[11px] tabular-nums text-muted">
                {f.start}–{f.end}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
