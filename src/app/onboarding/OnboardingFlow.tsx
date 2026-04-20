"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Archive,
  ArrowRight,
  Bag,
  Briefcase,
  CalendarCheck,
  Coffee,
  Eye,
  EyeSlash,
  ForkKnife,
  HardHat,
  Hourglass,
  Lightning,
  MapPin,
  NavigationArrow,
  Palette,
  Scissors,
  Star,
  Storefront,
  Truck,
  Wine,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { signUpOnboardingAction, createOnboardingBusiness } from "./actions";
import { KITS, KitDefinition } from "./kits";
import type { KitCategory, KitFamily } from "@/types/kit";
import { FOOD_SERVICE_CATEGORIES, SERVICES_CATEGORIES, RETAIL_PRODUCTS_CATEGORIES } from "@/lib/kit-config";

// ─── Types ────────────────────────────────────────────────────────────────────

type Step = 1 | 2 | 3 | 4;

interface FlowData {
  email: string;
  password: string;
  businessName: string;
  location: string;
  kitCategory: KitCategory;
}

// ─── Kit icon map ─────────────────────────────────────────────────────────────

const KIT_ICONS: Record<KitCategory, Icon> = {
  // Food Service
  cafe:         Coffee,
  diner:        ForkKnife,
  restaurant:   Storefront,
  pop_up:       MapPin,
  food_truck:   Truck,
  bar:          Wine,
  // Services — one icon per conversion model
  on_demand:    Lightning,
  project:      HardHat,
  scheduled:    CalendarCheck,
  professional: Briefcase,
  mobile:       NavigationArrow,
  // Retail & Products
  artist:       Palette,
  maker:        Scissors,
  retail:       Bag,
  brand:        Star,
  vintage:      Hourglass,
  collector:    Archive,
};

// ─── Category groups for Step 3 display ──────────────────────────────────────

type CategoryGroup = {
  family: KitFamily;
  label: string;
  categories: KitCategory[];
};

const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    family: "food_service",
    label: "Food Service",
    categories: [...FOOD_SERVICE_CATEGORIES],
  },
  {
    family: "services",
    label: "Services",
    categories: [...SERVICES_CATEGORIES],
  },
  {
    family: "retail_products",
    label: "Retail & Products",
    categories: [...RETAIL_PRODUCTS_CATEGORIES],
  },
];

const STEP_LABELS = ["Account", "Identity", "Kit", "Build"] as const;

// ─── Shared UI components ─────────────────────────────────────────────────────

function StepBadge({ text }: { text: string }) {
  return (
    <span
      style={{
        display: "block",
        fontSize: 9,
        fontWeight: 700,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: "#d97706",
        marginBottom: 6,
      }}
    >
      {text}
    </span>
  );
}

function PanelTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1
      style={{
        fontSize: 21,
        fontWeight: 700,
        color: "var(--admin-text)",
        margin: "0 0 4px",
        letterSpacing: "-0.02em",
      }}
    >
      {children}
    </h1>
  );
}

function PanelSub({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 13, color: "var(--admin-text-muted)", margin: "0 0 22px", lineHeight: 1.5 }}>
      {children}
    </p>
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div
      style={{
        padding: "10px 14px",
        borderRadius: 7,
        background: "rgba(239,68,68,0.08)",
        border: "1px solid rgba(239,68,68,0.2)",
        color: "#f87171",
        fontSize: 12,
        lineHeight: 1.5,
      }}
    >
      {message}
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="label-upper" style={{ display: "block", marginBottom: 6 }}>
      {children}
    </label>
  );
}

// ─── Step 1: Account ─────────────────────────────────────────────────────────

function AccountStep({
  data,
  update,
  onNext,
}: {
  data: FlowData;
  update: (u: Partial<FlowData>) => void;
  onNext: () => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (data.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    setError(null);
    const result = await signUpOnboardingAction(data.email, data.password);
    setLoading(false);
    if (result.error) setError(result.error);
    else onNext();
  }

  return (
    <div style={{ width: "100%", maxWidth: 440 }}>
      <div className="panel" style={{ padding: "28px 28px 24px" }}>
        <StepBadge text="Step 1 / 4 — Account" />
        <PanelTitle>Let&apos;s get your business live.</PanelTitle>
        <PanelSub>Create your account to get started.</PanelSub>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <FieldLabel>Email</FieldLabel>
            <input
              className="ctrl-input"
              type="email"
              autoComplete="email"
              required
              autoFocus
              value={data.email}
              onChange={(e) => update({ email: e.target.value })}
              placeholder="you@yourbusiness.com"
            />
          </div>

          <div>
            <FieldLabel>Password</FieldLabel>
            <div style={{ position: "relative" }}>
              <input
                className="ctrl-input"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={data.password}
                onChange={(e) => update({ password: e.target.value })}
                placeholder="6+ characters"
                style={{ paddingRight: 38 }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--admin-text-muted)",
                  display: "flex",
                  padding: 2,
                }}
              >
                {showPassword ? <EyeSlash size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {error && <ErrorBanner message={error} />}

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{ marginTop: 4, width: "100%", justifyContent: "center", padding: "10px 14px" }}
          >
            {loading ? "Creating account..." : (
              <>
                Get Started
                <ArrowRight size={13} style={{ marginLeft: 4 }} />
              </>
            )}
          </button>
        </form>
      </div>

      <p style={{ textAlign: "center", marginTop: 14, fontSize: 12, color: "var(--admin-text-muted)" }}>
        Already have an account?{" "}
        <a href="/admin/login" style={{ color: "#d97706", textDecoration: "none" }}>
          Sign in
        </a>
      </p>
    </div>
  );
}

// ─── Step 2: Identity ─────────────────────────────────────────────────────────

function IdentityStep({
  data,
  update,
  onNext,
  onBack,
  showBack = true,
}: {
  data: FlowData;
  update: (u: Partial<FlowData>) => void;
  onNext: () => void;
  onBack: () => void;
  showBack?: boolean;
}) {
  const [error, setError] = useState<string | null>(null);

  function handleNext(e: React.FormEvent) {
    e.preventDefault();
    if (!data.businessName.trim()) {
      setError("Business name is required.");
      return;
    }
    setError(null);
    onNext();
  }

  return (
    <div style={{ width: "100%", maxWidth: 440 }}>
      <div className="panel" style={{ padding: "28px 28px 24px" }}>
        <StepBadge text="Step 2 / 4 — Identity" />
        <PanelTitle>Tell us about your business.</PanelTitle>
        <PanelSub>Your name and location shape your site&apos;s default content.</PanelSub>

        <form onSubmit={handleNext} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <FieldLabel>Business Name</FieldLabel>
            <input
              className="ctrl-input"
              type="text"
              required
              autoFocus
              value={data.businessName}
              onChange={(e) => update({ businessName: e.target.value })}
              placeholder="e.g. The Green Fork"
            />
          </div>

          <div>
            <FieldLabel>
              Location{" "}
              <span style={{ color: "var(--admin-text-muted)", fontWeight: 400, letterSpacing: 0, textTransform: "none" }}>
                — optional
              </span>
            </FieldLabel>
            <input
              className="ctrl-input"
              type="text"
              value={data.location}
              onChange={(e) => update({ location: e.target.value })}
              placeholder="e.g. Austin, TX"
            />
          </div>

          {error && <ErrorBanner message={error} />}

          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            {showBack && (
              <button type="button" className="btn-ghost" onClick={onBack}>
                Back
              </button>
            )}
            <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>
              Continue
              <ArrowRight size={13} style={{ marginLeft: 4 }} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Step 3: Kit / Category Selection ────────────────────────────────────────

function KitStep({
  data,
  update,
  onNext,
  onBack,
}: {
  data: FlowData;
  update: (u: Partial<FlowData>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div style={{ width: "100%", maxWidth: 600 }}>
      <div className="panel" style={{ padding: "28px 28px 24px" }}>
        <StepBadge text="Step 3 / 4 — Kit" />
        <PanelTitle>What kind of business are you?</PanelTitle>
        <PanelSub>
          This activates the right modules and seeds your default content. You can customize everything after launch.
        </PanelSub>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 20 }}>
          {CATEGORY_GROUPS.map((group) => (
            <div key={group.family}>
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--admin-text-muted)",
                  marginBottom: 8,
                  paddingLeft: 2,
                }}
              >
                {group.label}
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: group.categories.length > 2 ? "repeat(3, 1fr)" : "repeat(2, 1fr)",
                  gap: 8,
                }}
              >
                {group.categories.map((category) => {
                  const kit: KitDefinition = KITS[category];
                  const IconComponent = KIT_ICONS[category];
                  const selected = data.kitCategory === category;

                  const baseCard = "rounded-2xl border bg-gradient-to-b transition-all duration-150";
                  const inactiveCard = "border-white/[0.08] bg-white/[0.03] from-white/[0.04] to-white/[0.02] hover:border-white/[0.14] hover:bg-white/[0.05] hover:from-white/[0.05] hover:to-white/[0.03] hover:-translate-y-px";
                  const activeCard = "border-amber-400/40 bg-amber-500/10 from-amber-400/[0.12] to-amber-500/[0.06] shadow-[0_0_0_1px_rgba(251,191,36,0.12)]";

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => update({ kitCategory: category })}
                      className={`relative flex flex-col gap-2 px-3.5 py-3 text-left cursor-pointer ${baseCard} ${selected ? activeCard : inactiveCard}`}
                    >
                      {selected && (
                        <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-amber-500" />
                      )}
                      <IconComponent
                        size={16}
                        weight={selected ? "duotone" : "regular"}
                        style={{ color: selected ? "#d97706" : "rgba(255,255,255,0.45)" }}
                      />
                      <div>
                        <div className={`text-xs font-semibold mb-0.5 ${selected ? "text-white" : "text-white/[0.88]"}`}>
                          {kit.label}
                        </div>
                        <div className={`text-[10.5px] leading-snug ${selected ? "text-white/70" : "text-white/[0.55]"}`}>
                          {kit.description}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {kit.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className={`text-[8.5px] font-semibold tracking-[0.08em] uppercase px-1.5 py-0.5 rounded ${
                              selected
                                ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                                : "border border-white/[0.08] bg-white/[0.03] text-white/[0.45]"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button type="button" className="btn-ghost" onClick={onBack}>
            Back
          </button>
          <button
            className="btn-primary"
            onClick={onNext}
            style={{ flex: 1, justifyContent: "center" }}
          >
            Build My Site
            <ArrowRight size={13} style={{ marginLeft: 4 }} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Step 4: Generate ─────────────────────────────────────────────────────────

interface LogEntry {
  id: number;
  text: string;
  status: "pending" | "done" | "error";
}

function buildSequence(kitLabel: string, catCount: number) {
  return [
    { text: "Validating business identity...", status: "pending" as const, delay: 0 },
    { text: "Identity confirmed.", status: "done" as const, delay: 550 },
    { text: `Loading ${kitLabel} kit...`, status: "pending" as const, delay: 950 },
    { text: `${kitLabel} kit initialized.`, status: "done" as const, delay: 1450 },
    { text: "Generating site structure...", status: "pending" as const, delay: 1850 },
    {
      text: catCount > 0 ? `${catCount} content modules configured.` : "Content modules configured.",
      status: "done" as const,
      delay: 2350,
    },
    { text: "Seeding default content...", status: "pending" as const, delay: 2750 },
    { text: "Content ready.", status: "done" as const, delay: 3250 },
  ];
}

function GenerateStep({
  data,
  onDone,
}: {
  data: FlowData;
  onDone: () => void;
}) {
  const kit = KITS[data.kitCategory];
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [animComplete, setAnimComplete] = useState(false);
  const [apiResult, setApiResult] = useState<{ slug?: string; error?: string } | null>(null);
  const idRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const calledRef = useRef(false);

  useEffect(() => {
    // Guard against React StrictMode double-invoke
    if (calledRef.current) return;
    calledRef.current = true;

    // Fire API call immediately
    createOnboardingBusiness(data.businessName, data.kitCategory, data.location).then(
      (result) => setApiResult(result)
    );

    // Animate log sequence
    const sequence = buildSequence(kit.label, kit.categories.length);
    const timers: ReturnType<typeof setTimeout>[] = [];

    sequence.forEach(({ text, status, delay }) => {
      timers.push(
        setTimeout(() => {
          const id = ++idRef.current;
          setLogs((prev) => [...prev, { id, text, status }]);
          if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
          }
        }, delay)
      );
    });

    timers.push(setTimeout(() => setAnimComplete(true), 3700));

    return () => timers.forEach(clearTimeout);
  }, []);

  const apiError = apiResult?.error;
  const allDone = animComplete && apiResult !== null && !apiError;

  // Append final "site ready" entry once everything resolves
  const finalShown = useRef(false);
  useEffect(() => {
    if (allDone && !finalShown.current) {
      finalShown.current = true;
      const id = ++idRef.current;
      setLogs((prev) => [
        ...prev,
        { id, text: "Site ready. You're good to go.", status: "done" },
      ]);
    }
  }, [allDone]);

  return (
    <div style={{ width: "100%", maxWidth: 440 }}>
      <div className="panel" style={{ padding: "28px 28px 24px" }}>
        <StepBadge text="Step 4 / 4 — Build" />
        <PanelTitle>{allDone ? "Your site is ready." : "Building your site..."}</PanelTitle>
        <PanelSub>
          {allDone
            ? `${data.businessName} is configured and ready to edit.`
            : "Hang tight — this takes just a few seconds."}
        </PanelSub>

        {/* Build log terminal */}
        <div
          ref={containerRef}
          style={{
            background: "rgba(0,0,0,0.28)",
            border: "1px solid var(--admin-panel-border)",
            borderRadius: 7,
            padding: "14px 16px",
            minHeight: 168,
            maxHeight: 210,
            overflowY: "auto",
            fontFamily: "ui-monospace, SFMono-Regular, 'Courier New', monospace",
            fontSize: 11,
            lineHeight: 1.75,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              color: "var(--admin-text-muted)",
              fontSize: 9,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            locallayer build — {new Date().toISOString().slice(0, 10)}
          </div>

          {logs.map((entry) => (
            <div
              key={entry.id}
              style={{
                display: "flex",
                gap: 8,
                color:
                  entry.status === "done"
                    ? "#4ade80"
                    : entry.status === "error"
                    ? "#f87171"
                    : "#d97706",
              }}
            >
              <span style={{ flexShrink: 0, userSelect: "none" }}>
                {entry.status === "done" ? "✓" : entry.status === "error" ? "✗" : "▶"}
              </span>
              <span style={{ color: entry.status === "done" ? "#9090a8" : "inherit" }}>
                {entry.text}
              </span>
            </div>
          ))}

          {!animComplete && !apiError && (
            <div style={{ display: "flex", gap: 4, paddingLeft: 16, marginTop: 2 }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="animate-pulse-dot"
                  style={{
                    width: 3,
                    height: 3,
                    borderRadius: "50%",
                    background: "#d97706",
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {apiError && (
          <div style={{ marginBottom: 16 }}>
            <ErrorBanner message={apiError} />
          </div>
        )}

        {allDone && (
          <button
            className="btn-primary"
            onClick={onDone}
            style={{ width: "100%", justifyContent: "center", padding: "11px 14px" }}
          >
            Enter Dashboard
            <ArrowRight size={13} style={{ marginLeft: 4 }} />
          </button>
        )}

        {apiError && (
          <a
            href="/onboarding"
            className="btn-ghost"
            style={{ display: "inline-flex", width: "100%", justifyContent: "center", textDecoration: "none" }}
          >
            Start Over
          </a>
        )}
      </div>
    </div>
  );
}

// ─── Main flow controller ─────────────────────────────────────────────────────

export function OnboardingFlow({ initialStep = 1 }: { initialStep?: 1 | 2 }) {
  const router = useRouter();
  const [step, setStep] = useState<Step>(initialStep as Step);
  const [data, setData] = useState<FlowData>({
    email: "",
    password: "",
    businessName: "",
    location: "",
    kitCategory: "restaurant",
  });

  function update(partial: Partial<FlowData>) {
    setData((prev) => ({ ...prev, ...partial }));
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--admin-bg)",
        color: "var(--admin-text)",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
      }}
    >
      {/* ── Top bar ── */}
      <div
        style={{
          height: 52,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          background: "var(--admin-chrome)",
          borderBottom: "1px solid var(--admin-chrome-border)",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#d97706",
          }}
        >
          Local Layer
        </span>

        {/* Step indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {STEP_LABELS.map((label, i) => {
            const n = (i + 1) as Step;
            const active = n === step;
            const done = n < step;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: active
                        ? "#d97706"
                        : done
                        ? "rgba(217,119,6,0.45)"
                        : "var(--admin-text-muted)",
                      transition: "background 0.2s",
                    }}
                  />
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: active ? 700 : 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: active ? "#d97706" : "var(--admin-text-muted)",
                      transition: "color 0.2s",
                    }}
                  >
                    {label}
                  </span>
                </div>
                {i < STEP_LABELS.length - 1 && (
                  <div
                    style={{
                      width: 14,
                      height: 1,
                      background: done ? "rgba(217,119,6,0.3)" : "var(--admin-panel-border)",
                      transition: "background 0.2s",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Step content ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px 16px 48px",
        }}
      >
        {step === 1 && <AccountStep data={data} update={update} onNext={() => setStep(2)} />}
        {step === 2 && (
          <IdentityStep
            data={data}
            update={update}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
            showBack={initialStep < 2}
          />
        )}
        {step === 3 && (
          <KitStep data={data} update={update} onNext={() => setStep(4)} onBack={() => setStep(2)} />
        )}
        {step === 4 && (
          <GenerateStep data={data} onDone={() => router.push("/admin")} />
        )}
      </div>
    </div>
  );
}
