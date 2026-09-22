import { Link, useRouterState } from "@tanstack/react-router";
import { Activity, Dna, Hexagon, Pill, Terminal } from "lucide-react";
import type { ReactNode } from "react";
import { t } from "@/lib/copy";
import { useStudio } from "@/lib/studio-store";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const NAV = [
  { to: "/", key: "navHome" as const, icon: Activity },
  { to: "/constructs", key: "navConstructs" as const, icon: Hexagon },
  { to: "/linkers", key: "navLinkers" as const, icon: Terminal },
  { to: "/plasmid", key: "navPlasmid" as const, icon: Dna },
  { to: "/archive", key: "navArchive" as const, icon: Pill },
];

export function AppShell({ children }: { children: ReactNode }) {
  const lang = useStudio((s) => s.lang);
  const setLang = useStudio((s) => s.setLang);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const rtl = lang === "fa";

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="min-h-dvh bg-bg text-fg">
      <header className="sticky top-0 z-20 border-b border-border bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="flex min-h-11 items-center gap-2">
            <span className="grid size-8 place-items-center rounded-[var(--radius-sm)] bg-accent text-accent-fg">
              <Activity className="size-4" />
            </span>
            <span className="font-display text-lg leading-none">{t(lang, "app")}</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => {
              const Icon = item.icon;
              const on = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "inline-flex h-11 items-center gap-2 rounded-[var(--radius-sm)] px-3 text-sm",
                    on ? "bg-elevated text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  <Icon className="size-4" />
                  {t(lang, item.key)}
                </Link>
              );
            })}
          </nav>
          <Button variant="outline" size="sm" onClick={() => setLang(rtl ? "en" : "fa")}>
            {rtl ? "EN" : "FA"}
          </Button>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-6 md:pb-12">{children}</main>
      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-bg/95 md:hidden">
        <div className="grid grid-cols-5">
          {NAV.map((item) => {
            const Icon = item.icon;
            const on = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex min-h-14 flex-col items-center justify-center gap-1 text-[11px]",
                  on ? "text-accent" : "text-muted",
                )}
              >
                <Icon className="size-4" />
                {t(lang, item.key)}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
