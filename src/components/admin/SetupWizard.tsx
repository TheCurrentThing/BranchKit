import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export const setupSteps = [
  { step: "1", label: "Business Info", href: "/admin/setup?step=1" },
  { step: "2", label: "Branding", href: "/admin/setup?step=2" },
  { step: "3", label: "Hours", href: "/admin/setup?step=3" },
  { step: "4", label: "Menu Setup", href: "/admin/setup?step=4" },
  { step: "5", label: "Specials", href: "/admin/setup?step=5" },
  { step: "6", label: "Review", href: "/admin/setup?step=6" },
];

export function SetupWizardSteps({ currentStep }: { currentStep: string }) {
  return (
    <section className="admin-panel rounded-[1.5rem]">
      <div className="border-b border-white/[0.08] px-5 py-4">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
          Setup Sequence
        </p>
        <h2 className="mt-2 text-[1.35rem] font-semibold text-white">Wizard navigation</h2>
      </div>

      <div className="grid gap-3 px-4 py-4 md:grid-cols-3 xl:grid-cols-6">
        {setupSteps.map((item) => {
          const active = item.step === currentStep;

          return (
            <Link
              key={item.step}
              href={item.href}
              className={[
                "admin-panel admin-panel-hover rounded-[1rem] px-4 py-3",
                active
                  ? "border-[var(--color-primary)] bg-[linear-gradient(180deg,rgba(181,84,61,0.18),rgba(181,84,61,0.05))]"
                  : "border-white/[0.08] bg-black/20",
              ].join(" ")}
            >
              <div className="flex items-center gap-2">
                <Badge
                  variant={active ? "default" : "secondary"}
                  className="rounded-full font-mono text-[10px] tracking-[0.2em]"
                >
                  {item.step}
                </Badge>
                <span className="text-sm font-semibold text-white">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
