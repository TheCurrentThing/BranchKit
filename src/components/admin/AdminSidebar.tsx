"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import type { AdminNavItem } from "@/types/admin";

export function AdminSidebar({
  brandName,
  items,
  persistenceEnabled,
}: {
  brandName: string;
  items: AdminNavItem[];
  persistenceEnabled: boolean;
}) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full flex-col border-r border-white/[0.07] bg-black/30 backdrop-blur-xl">
      <div className="border-b border-white/[0.07] px-5 py-5">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
          Control Terminal
        </p>
        <h2 className="mt-3 font-heading text-[1.85rem] leading-none text-white">
          {brandName}
        </h2>
        <p className="mt-3 text-sm leading-6 text-white/50">
          Daily operations, site presentation, and live publishing in one system.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge
            variant={persistenceEnabled ? "default" : "secondary"}
            className="rounded-full border border-white/10 bg-white/[0.05] font-mono text-[10px] tracking-[0.2em]"
          >
            {persistenceEnabled ? "Live Sync Enabled" : "Seed Mode"}
          </Badge>
          <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/48">
            Operator View
          </div>
        </div>
      </div>

      <div className="admin-scrollbar flex-1 overflow-y-auto px-3 py-4">
        <nav className="space-y-2">
          {items.map((item, index) => {
            const active =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.key}
                href={item.href}
                className={[
                  "admin-panel admin-panel-hover block rounded-[1.1rem] px-4 py-3",
                  active
                    ? "border-[var(--color-primary)] bg-[linear-gradient(180deg,rgba(181,84,61,0.18),rgba(181,84,61,0.05))] shadow-[0_0_0_1px_rgba(181,84,61,0.16)]"
                    : "border-white/[0.05] bg-white/[0.02]",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-white/38">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-white">{item.label}</p>
                    <p className="mt-1 text-xs leading-5 text-white/45">
                      {item.description}
                    </p>
                  </div>
                  <span
                    className={[
                      "mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full",
                      active ? "bg-[var(--color-primary)] shadow-[0_0_12px_rgba(181,84,61,0.75)]" : "bg-white/20",
                    ].join(" ")}
                  />
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

