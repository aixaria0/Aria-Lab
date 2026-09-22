import type { HostId, LinkerId } from "@/lib/engine";
import { cn } from "@/lib/utils";

export function VeinHeatmap({
  rows,
  activeLinker,
  activeHost,
  onPick,
}: {
  rows: { linkerId: LinkerId; name: string; cells: { host: HostId; vein: number }[] }[];
  activeLinker: LinkerId;
  activeHost: HostId;
  onPick: (linker: LinkerId, host: HostId) => void;
}) {
  const hosts: HostId[] = ["ecoli", "pichia", "human"];
  const all = rows.flatMap((r) => r.cells.map((c) => c.vein));
  const min = Math.min(...all);
  const max = Math.max(...all);
  const t = (v: number) => (max === min ? 0.5 : (v - min) / (max - min));

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-[11px]">
        <thead>
          <tr className="text-muted">
            <th className="pb-2 pr-2 font-medium">Linker</th>
            {hosts.map((h) => (
              <th key={h} className="pb-2 px-1 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="font-mono tabular-nums">
          {rows.map((r) => (
            <tr key={r.linkerId}>
              <td className="py-0.5 pr-2 text-muted">{r.name}</td>
              {r.cells.map((c) => {
                const on = r.linkerId === activeLinker && c.host === activeHost;
                const u = t(c.vein);
                return (
                  <td key={c.host} className="px-0.5 py-0.5">
                    <button
                      type="button"
                      onClick={() => onPick(r.linkerId, c.host)}
                      className={cn(
                        "flex h-8 w-full items-center justify-center rounded-[6px] border text-[11px]",
                        on ? "border-accent text-accent-fg" : "border-transparent text-fg",
                      )}
                      style={{
                        background: on
                          ? "var(--color-accent)"
                          : `color-mix(in oklab, var(--color-accent) ${Math.round(18 + u * 55)}%, var(--color-elevated))`,
                      }}
                    >
                      {c.vein.toFixed(1)}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
