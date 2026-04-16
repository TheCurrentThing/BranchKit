import Link from "next/link";
import { Button } from "@/components/ui/button";

export function DashboardStatCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: string | number;
  helper: string;
}) {
  return (
    <div className="rounded-[1.75rem] border border-white/[0.07] bg-[#1a1a1a] p-5 text-white">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
        {label}
      </p>
      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-white/55">
        {helper}
      </p>
    </div>
  );
}

export function QuickActionCard({
  title,
  description,
  href,
  cta,
}: {
  title: string;
  description: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-white/[0.08] bg-black/20 p-4 text-white">
      <p className="text-lg font-semibold text-white">{title}</p>
      <p className="mt-2 text-sm leading-6 text-white/58">{description}</p>
      <div className="mt-4">
        <Button asChild className="w-full justify-between shadow-none">
          <Link href={href}>{cta}</Link>
        </Button>
      </div>
    </div>
  );
}
