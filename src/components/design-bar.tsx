import type { ReactNode } from "react";
import { CONSTRUCTS, LINKERS, type HostId } from "@/lib/engine";
import { useStudio } from "@/lib/studio-store";
import { cn } from "@/lib/utils";

const HOSTS: { id: HostId; label: string }[] = [
  { id: "ecoli", label: "E. coli" },
  { id: "pichia", label: "Pichia" },
  { id: "human", label: "Human" },
];

export function DesignBar() {
  const constructId = useStudio((s) => s.constructId);
  const linkerId = useStudio((s) => s.linkerId);
  const host = useStudio((s) => s.host);
  const setConstruct = useStudio((s) => s.setConstruct);
  const setLinker = useStudio((s) => s.setLinker);
  const setHost = useStudio((s) => s.setHost);

  return (
    <div className="flex flex-col gap-3">
      <Row label="Construct">
        {CONSTRUCTS.map((c) => (
          <Chip key={c.id} on={constructId === c.id} onClick={() => setConstruct(c.id)}>
            {c.name}
          </Chip>
        ))}
      </Row>
      <Row label="Host">
        {HOSTS.map((h) => (
          <Chip key={h.id} on={host === h.id} onClick={() => setHost(h.id)}>
            {h.label}
          </Chip>
        ))}
      </Row>
      <Row label="Linker">
        {LINKERS.map((l) => (
          <Chip key={l.id} on={linkerId === l.id} onClick={() => setLinker(l.id)}>
            {l.name}
          </Chip>
        ))}
      </Row>
    </div>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
      <span className="w-20 shrink-0 pt-2 text-xs font-medium tracking-wide text-muted uppercase">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function Chip({
  on,
  onClick,
  children,
}: {
  on: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-9 rounded-full border px-3 text-xs font-medium",
        on ? "border-accent/50 bg-accent text-accent-fg" : "border-border bg-surface text-muted hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}
