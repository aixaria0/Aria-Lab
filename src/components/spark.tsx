import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function HydroChart({ data }: { data: { i: number; kd: number }[] }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return <div className="h-40 rounded-[var(--radius-md)] bg-elevated" />;
  const sampled = data.filter((_, idx) => idx % Math.max(1, Math.floor(data.length / 180)) === 0);
  return (
    <div className="h-40 w-full">
      <ResponsiveContainer>
        <AreaChart data={sampled} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="var(--color-border)" vertical={false} />
          <XAxis dataKey="i" hide />
          <YAxis hide domain={["auto", "auto"]} />
          <Tooltip
            contentStyle={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: 8,
              fontSize: 11,
              color: "var(--color-fg)",
            }}
          />
          <Area type="monotone" dataKey="kd" stroke="var(--color-accent)" fill="var(--color-accent)" fillOpacity={0.18} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ChargeChart({ data }: { data: { pH: number; q: number }[] }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return <div className="h-40 rounded-[var(--radius-md)] bg-elevated" />;
  return (
    <div className="h-40 w-full">
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="var(--color-border)" vertical={false} />
          <XAxis dataKey="pH" tick={{ fill: "var(--color-muted)", fontSize: 10 }} />
          <YAxis tick={{ fill: "var(--color-muted)", fontSize: 10 }} width={32} />
          <Tooltip
            contentStyle={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: 8,
              fontSize: 11,
              color: "var(--color-fg)",
            }}
          />
          <Line type="monotone" dataKey="q" stroke="var(--color-domain-b)" dot={false} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function GcChart({ data }: { data: { i: number; gc: number }[] }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return <div className="h-36 rounded-[var(--radius-md)] bg-elevated" />;
  return (
    <div className="h-36 w-full">
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="var(--color-border)" vertical={false} />
          <XAxis dataKey="i" hide />
          <YAxis domain={[0.2, 0.8]} hide />
          <Tooltip
            contentStyle={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: 8,
              fontSize: 11,
              color: "var(--color-fg)",
            }}
          />
          <Area type="monotone" dataKey="gc" stroke="var(--color-domain-a)" fill="var(--color-domain-a)" fillOpacity={0.2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
