import Link from "next/link";
import {
  Sparkle,
  ForkKnife,
  Clock,
  House,
  ArrowUpRight,
  ChartLine,
  Broadcast,
  Briefcase,
  Star,
  Images,
  Package,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { AdminShell } from "@/components/admin/AdminShell";
import { getAdminSitePayload, getPageViewStats } from "@/lib/queries";
import { getCategoryConfig } from "@/lib/kit-config";
import type { KitFamily } from "@/types/kit";

/* ─── inline primitives (server-safe, no hooks) ───────────────── */

function Dot({ on }: { on: boolean }) {
  return (
    <span
      style={{
        display: "inline-block",
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: on ? "#4ade80" : "#2e2e35",
        flexShrink: 0,
        ...(on ? { animation: "pulse-dot 2s ease-in-out infinite" } : {}),
      }}
    />
  );
}

function SysRow({ label, value, on }: { label: string; value: string; on?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 0",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <span style={{ fontSize: 11, color: "#55555e" }}>{label}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {on !== undefined && <Dot on={on} />}
        <span style={{ fontSize: 11, fontWeight: 500, color: "#9896a0" }}>{value}</span>
      </div>
    </div>
  );
}

function MetricTile({
  label,
  value,
  sub,
  amber,
}: {
  label: string;
  value: string;
  sub: string;
  amber?: boolean;
}) {
  return (
    <div
      style={{
        padding: "14px 16px",
        borderRadius: 9,
        background: amber ? "rgba(217,119,6,0.06)" : "rgba(255,255,255,0.022)",
        border: amber ? "1px solid rgba(217,119,6,0.16)" : "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <span className="label-upper">{label}</span>
      <span
        style={{
          fontSize: 26,
          fontWeight: 700,
          color: amber ? "#d97706" : "#e2e0d8",
          letterSpacing: "-0.03em",
          lineHeight: 1,
        }}
      >
        {value}
      </span>
      <span style={{ fontSize: 11, color: "#4b4b54" }}>{sub}</span>
    </div>
  );
}

/* ActionTile uses the .action-tile CSS class (defined in globals.css)
   so hover effects work without client-side event handlers */
function ActionTile({
  label,
  desc,
  href,
  icon: Icon,
}: {
  label: string;
  desc: string;
  href: string;
  icon: PhosphorIcon;
}) {
  return (
    <Link href={href} className="action-tile">
      <div
        style={{
          borderRadius: 7,
          padding: "7px",
          background: "rgba(217,119,6,0.1)",
          border: "1px solid rgba(217,119,6,0.18)",
          flexShrink: 0,
        }}
      >
        <Icon size={13} style={{ color: "#d97706", display: "block" }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: "#c9c7c0", margin: 0 }}>{label}</p>
        <p style={{ fontSize: 11, color: "#4b4b54", marginTop: 3 }}>{desc}</p>
      </div>
      <ArrowUpRight size={13} style={{ color: "#3a3a42", flexShrink: 0, marginTop: 2 }} />
    </Link>
  );
}

/* ─── family-specific config ─────────────────────────────────────── */

type FamilyDashboardConfig = {
  primaryLabel: string;
  primaryCount: number;
  primarySub: string;
  secondaryLabel: string;
  secondaryCount: number;
  secondarySub: string;
  snapshotPrimaryLabel: string;
  snapshotPrimaryContent: React.ReactNode;
  actions: { label: string; desc: string; href: string; icon: PhosphorIcon }[];
  statusPrimaryLabel: string;
  statusPrimaryValue: string;
  statusPrimaryOn: boolean;
};

/* ─── page ──────────────────────────────────────────────────────── */

export default async function AdminDashboardPage() {
  const [payload, traffic] = await Promise.all([
    getAdminSitePayload(),
    getPageViewStats(),
  ]);

  const kitConfig = getCategoryConfig(payload.kitCategory);
  const kitFamily: KitFamily = payload.kitFamily;

  // ── Section visibility using kit publicSections ───────────────
  const SECTION_LABELS: Record<string, string> = {
    hero: "Hero",
    quick_info: "Quick Info",
    announcements: "Announcements",
    specials: "Specials",
    events: "Events",
    featured_menu: "Featured Menu",
    menu_preview: "Menu",
    offerings: "Offerings",
    featured_products: "Products",
    products: "Products",
    testimonials: "Testimonials",
    service_areas: "Service Areas",
    gallery: "Gallery",
    about: "About",
    contact: "Contact",
  };

  const visibleSections = [
    payload.meta.announcementIsActive && payload.meta.announcementBody.trim()
      ? "Announcement"
      : null,
    ...kitConfig.publicSections.map((s) => SECTION_LABELS[s] ?? s),
  ].filter(Boolean) as string[];

  // ── Family-specific computed values ──────────────────────────
  const totalMenuItems = payload.menuCategories.reduce(
    (count, cat) => count + cat.items.length,
    0,
  );
  const totalOfferings = payload.serviceOfferings.length;
  const totalTestimonials = payload.testimonials.length;
  const featuredOffering =
    payload.serviceOfferings.find((o) => o.isFeatured && o.isActive) ??
    payload.serviceOfferings.find((o) => o.isActive) ??
    null;

  const featuredSpecial =
    payload.specials.find((s) => s.isFeatured && s.isActive) ??
    payload.specials.find((s) => s.isActive) ??
    null;

  const featuredSpecialLabel = featuredSpecial
    ? featuredSpecial.price === null
      ? featuredSpecial.title
      : `${featuredSpecial.title} ($${featuredSpecial.price.toFixed(2)})`
    : "No live special selected";

  const featuredCount = payload.specials.filter((s) => s.isFeatured).length;
  const todayHours = payload.hours[0] ?? null;

  // ── Family-specific actions ───────────────────────────────────
  const FOOD_ACTIONS = [
    { label: "Update Today's Special", desc: "Change the featured dish customers see right now", href: "/admin/specials", icon: Sparkle },
    { label: "Edit Menu & Prices", desc: "Manage sections, items, descriptions, pricing", href: "/admin/menu", icon: ForkKnife },
    { label: "Change Hours", desc: "Update business hours and quick-hours summary", href: "/admin/hours", icon: Clock },
    { label: "Post Announcement", desc: "Update the top banner — closures, promos, reminders", href: "/admin/homepage", icon: House },
  ];

  const SERVICES_ACTIONS = [
    { label: "Manage Services", desc: "Add, edit, or reorder your service offerings", href: "/admin/offerings", icon: Briefcase },
    { label: "Add Testimonial", desc: "Publish a client review or recommendation", href: "/admin/testimonials", icon: Star },
    { label: "Change Hours", desc: "Update business hours and quick-hours summary", href: "/admin/hours", icon: Clock },
    { label: "Post Announcement", desc: "Update the top banner — closures, promos, reminders", href: "/admin/homepage", icon: House },
  ];

  const RETAIL_ACTIONS = [
    { label: "Manage Products", desc: "Add, edit, or reorder your product catalog", href: "/admin/products", icon: Package },
    { label: "Update Gallery", desc: "Add photos of your work and products", href: "/admin/gallery", icon: Images },
    { label: "Post Announcement", desc: "Update the top banner — closures, promos, reminders", href: "/admin/homepage", icon: House },
  ];

  const familyActions =
    kitFamily === "services" ? SERVICES_ACTIONS
    : kitFamily === "retail_products" ? RETAIL_ACTIONS
    : FOOD_ACTIONS;

  // ── Family-specific metrics + snapshot ───────────────────────
  const familyConfig: FamilyDashboardConfig =
    kitFamily === "services"
      ? {
          primaryLabel: "Offerings",
          primaryCount: totalOfferings,
          primarySub: "in service catalog",
          secondaryLabel: "Testimonials",
          secondaryCount: totalTestimonials,
          secondarySub: "client reviews",
          snapshotPrimaryLabel: "Featured Offering",
          snapshotPrimaryContent: featuredOffering ? (
            <>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#e2e0d8", marginTop: 5, letterSpacing: "-0.01em" }}>
                {featuredOffering.title}
              </p>
              {featuredOffering.shortDescription && (
                <p style={{ fontSize: 11, color: "#5a5a64", marginTop: 3 }}>
                  {featuredOffering.shortDescription}
                </p>
              )}
              {featuredOffering.startingPrice && (
                <p style={{ fontSize: 13, fontWeight: 700, color: "#d97706", marginTop: 7 }}>
                  {featuredOffering.startingPrice}
                </p>
              )}
            </>
          ) : (
            <p style={{ fontSize: 12, color: "#5a5a64", marginTop: 5 }}>No offering is currently featured</p>
          ),
          actions: familyActions,
          statusPrimaryLabel: "Offerings",
          statusPrimaryValue: `${totalOfferings} in catalog`,
          statusPrimaryOn: totalOfferings > 0,
        }
      : kitFamily === "retail_products"
      ? {
          primaryLabel: "Gallery",
          primaryCount: payload.galleryImages.length,
          primarySub: "visible photos",
          secondaryLabel: "Sections",
          secondaryCount: visibleSections.length,
          secondarySub: "homepage live",
          snapshotPrimaryLabel: "Gallery",
          snapshotPrimaryContent: (
            <p style={{ fontSize: 12, color: "#7a7a84", marginTop: 5 }}>
              {payload.galleryImages.length} photo{payload.galleryImages.length !== 1 ? "s" : ""} in library
            </p>
          ),
          actions: familyActions,
          statusPrimaryLabel: "Gallery",
          statusPrimaryValue: `${payload.galleryImages.length} images`,
          statusPrimaryOn: payload.galleryImages.length > 0,
        }
      : {
          // food_service
          primaryLabel: "Menu Items",
          primaryCount: totalMenuItems,
          primarySub: `across ${payload.menuCategories.length} sections`,
          secondaryLabel: "Featured",
          secondaryCount: featuredCount,
          secondarySub: "starred items",
          snapshotPrimaryLabel: "Today's Special",
          snapshotPrimaryContent: featuredSpecial ? (
            <>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#e2e0d8", marginTop: 5, letterSpacing: "-0.01em" }}>
                {featuredSpecial.title}
              </p>
              {featuredSpecial.description && (
                <p style={{ fontSize: 11, color: "#5a5a64", marginTop: 3 }}>
                  {featuredSpecial.description}
                </p>
              )}
              {featuredSpecial.price !== null && (
                <p style={{ fontSize: 13, fontWeight: 700, color: "#d97706", marginTop: 7 }}>
                  ${featuredSpecial.price.toFixed(2)}
                </p>
              )}
            </>
          ) : (
            <p style={{ fontSize: 12, color: "#5a5a64", marginTop: 5 }}>No special is currently featured</p>
          ),
          actions: familyActions,
          statusPrimaryLabel: "Active Special",
          statusPrimaryValue: featuredSpecial ? "1 running" : "None",
          statusPrimaryOn: !!featuredSpecial,
        };

  // ── Activity log ──────────────────────────────────────────────
  const primaryActivityEvent =
    kitFamily === "services"
      ? `${totalOfferings} service${totalOfferings !== 1 ? "s" : ""} in catalog`
      : kitFamily === "retail_products"
      ? `${payload.galleryImages.length} gallery photo${payload.galleryImages.length !== 1 ? "s" : ""}`
      : `${totalMenuItems} menu items`;

  const primaryActivityDetail =
    kitFamily === "services"
      ? `${totalTestimonials} client testimonial${totalTestimonials !== 1 ? "s" : ""}`
      : kitFamily === "retail_products"
      ? "in photo library"
      : `across ${payload.menuCategories.length} ${payload.menuCategories.length === 1 ? "category" : "categories"}`;

  const activityItems = [
    {
      time: "Live",
      event: "Site is published",
      detail: `${visibleSections.length} homepage sections visible`,
    },
    kitFamily === "food_service"
      ? {
          time: "Active",
          event: "Featured special",
          detail: featuredSpecialLabel,
        }
      : kitFamily === "services"
      ? {
          time: "Active",
          event: featuredOffering ? `Featured: ${featuredOffering.title}` : "No featured offering",
          detail: featuredOffering?.shortDescription ?? "Set a featured offering to highlight it",
        }
      : null,
    {
      time: "Active",
      event: primaryActivityEvent,
      detail: primaryActivityDetail,
    },
    {
      time: "Active",
      event: `${payload.galleryImages.length} gallery photos`,
      detail: "in photo library",
    },
    {
      time: payload.meta.announcementIsActive && payload.meta.announcementBody.trim() ? "Live" : "Off",
      event: "Announcement bar",
      detail: payload.meta.announcementIsActive && payload.meta.announcementBody.trim()
        ? payload.meta.announcementBody.slice(0, 48) + (payload.meta.announcementBody.length > 48 ? "…" : "")
        : "No announcement is broadcasting",
    },
    ...(traffic !== null
      ? traffic.topPages.map((page) => ({
          time: String(page.count),
          event: page.path,
          detail: "views in last 7 days",
        }))
      : []),
  ].filter(Boolean) as { time: string; event: string; detail: string }[];

  return (
    <AdminShell
      activeKey="overview"
      brandName={payload.brand.businessName}
      eyebrow="Overview"
      title="Overview"
      previewHref="/preview"
      liveHref={payload.businessSlug ? `/${payload.businessSlug}` : undefined}
      contentClassName="min-h-0 flex flex-1 flex-col overflow-hidden"
    >
      <div
        className="animate-fade-in"
        style={{
          height: "100%",
          display: "flex",
          overflow: "hidden",
          padding: "2px",
          gap: "12px",
        }}
      >
        {/* ── COL 1: System status + metrics ── */}
        <div style={{ width: 260, minWidth: 260, display: "flex", flexDirection: "column", gap: 10 }}>
          {/* Status panel */}
          <div
            style={{
              background: "rgba(255,255,255,0.018)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <div className="panel-header">
              <span className="label-upper">System Status</span>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <Dot on={true} />
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: "#4ade80",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  All Live
                </span>
              </div>
            </div>
            <div style={{ padding: "4px 16px 8px" }}>
              <SysRow label="Site Status" value="Published" on={true} />
              <SysRow
                label={familyConfig.statusPrimaryLabel}
                value={familyConfig.statusPrimaryValue}
                on={familyConfig.statusPrimaryOn}
              />
              <SysRow
                label="Open Today"
                value={todayHours?.openText ?? (payload.hours.length === 0 ? "Not configured" : "See hours")}
                on={payload.hours.length > 0}
              />
              <SysRow label="Gallery" value={`${payload.galleryImages.length} images`} />
              {kitFamily === "services" && (
                <SysRow label="Testimonials" value={`${totalTestimonials} reviews`} />
              )}
              {kitFamily === "food_service" && (
                <SysRow label="Menu Items" value={`${totalMenuItems} items`} />
              )}
              <SysRow label="Sections Live" value={`${visibleSections.length} visible`} />
            </div>
          </div>

          {/* Metrics grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <MetricTile
              label={familyConfig.primaryLabel}
              value={String(familyConfig.primaryCount)}
              sub={familyConfig.primarySub}
              amber
            />
            <MetricTile
              label={familyConfig.secondaryLabel}
              value={String(familyConfig.secondaryCount)}
              sub={familyConfig.secondarySub}
            />
            <MetricTile
              label="Gallery"
              value={String(payload.galleryImages.length)}
              sub="visible photos"
            />
            <MetricTile
              label="Sections"
              value={`${visibleSections.length}`}
              sub="homepage live"
              amber
            />
            {traffic !== null && (
              <>
                <MetricTile
                  label="Views Today"
                  value={String(traffic.today)}
                  sub="page visits"
                />
                <MetricTile
                  label="Views (7d)"
                  value={String(traffic.week)}
                  sub="this week"
                  amber
                />
              </>
            )}
          </div>
        </div>

        {/* ── COL 2: Primary actions + activity ── */}
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 10 }}>
          {/* Command actions */}
          <div
            style={{
              background: "rgba(255,255,255,0.018)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <div className="panel-header">
              <span className="label-upper">Command Actions</span>
              <span
                style={{
                  fontSize: 9,
                  color: "#35353e",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Quick Edit
              </span>
            </div>
            <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 7 }}>
              {familyConfig.actions.map((action) => (
                <ActionTile
                  key={action.href}
                  label={action.label}
                  desc={action.desc}
                  href={action.href}
                  icon={action.icon}
                />
              ))}
            </div>
          </div>

          {/* Activity log */}
          <div
            style={{
              flex: 1,
              minHeight: 0,
              background: "rgba(255,255,255,0.018)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 10,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="panel-header">
              <span className="label-upper">Live State</span>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {traffic !== null && (
                  <span style={{ fontSize: 10, color: "#55555e", fontWeight: 500 }}>
                    {traffic.week} visits this week
                  </span>
                )}
                <ChartLine size={12} style={{ color: "#35353e" }} />
              </div>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "4px 0" }}>
              {activityItems.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    padding: "10px 16px",
                    borderBottom:
                      i < activityItems.length - 1
                        ? "1px solid rgba(255,255,255,0.04)"
                        : "none",
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      color: "#3a3a42",
                      whiteSpace: "nowrap",
                      paddingTop: 1,
                      width: 46,
                    }}
                  >
                    {item.time}
                  </span>
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 500, color: "#9896a0", margin: 0 }}>
                      {item.event}
                    </p>
                    <p style={{ fontSize: 11, color: "#3e3e46", marginTop: 2 }}>{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── COL 3: Live snapshot ── */}
        <div
          style={{
            width: 262,
            minWidth: 262,
            background: "rgba(255,255,255,0.018)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 10,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="panel-header">
            <span className="label-upper">Live Snapshot</span>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Broadcast size={11} style={{ color: "#4ade80" }} />
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: "#4ade80",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Live
              </span>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "12px" }}>
            {/* Announcement */}
            <div
              style={{
                padding: "10px 12px",
                borderRadius: 8,
                background: payload.meta.announcementIsActive && payload.meta.announcementBody.trim()
                  ? "rgba(217,119,6,0.07)"
                  : "rgba(255,255,255,0.022)",
                border: payload.meta.announcementIsActive && payload.meta.announcementBody.trim()
                  ? "1px solid rgba(217,119,6,0.16)"
                  : "1px solid rgba(255,255,255,0.065)",
                marginBottom: 8,
              }}
            >
              <span
                className="label-upper"
                style={
                  payload.meta.announcementIsActive && payload.meta.announcementBody.trim()
                    ? { color: "rgba(217,119,6,0.65)" }
                    : {}
                }
              >
                Announcement
              </span>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#c9c7c0", marginTop: 5 }}>
                {payload.meta.announcementIsActive && payload.meta.announcementBody.trim()
                  ? payload.meta.announcementBody
                  : "No announcement broadcasting"}
              </p>
            </div>

            {/* Family-specific primary snapshot panel */}
            <div
              style={{
                padding: "10px 12px",
                borderRadius: 8,
                background: "rgba(255,255,255,0.022)",
                border: "1px solid rgba(255,255,255,0.065)",
                marginBottom: 8,
              }}
            >
              <span className="label-upper">{familyConfig.snapshotPrimaryLabel}</span>
              {familyConfig.snapshotPrimaryContent}
            </div>

            {/* Hours */}
            <div
              style={{
                padding: "10px 12px",
                borderRadius: 8,
                background: "rgba(255,255,255,0.022)",
                border: "1px solid rgba(255,255,255,0.065)",
                marginBottom: 8,
              }}
            >
              <span className="label-upper">Hours</span>
              {payload.hours.length > 0 ? (
                payload.hours.slice(0, 3).map((h) => (
                  <p key={h.dayLabel} style={{ fontSize: 11, color: "#7a7a84", marginTop: 5 }}>
                    {h.dayLabel} · {h.openText}
                  </p>
                ))
              ) : (
                <p style={{ fontSize: 11, color: "#5a5a64", marginTop: 5 }}>Not configured</p>
              )}
            </div>

            {/* Visible sections */}
            <div
              style={{
                padding: "10px 12px",
                borderRadius: 8,
                background: "rgba(255,255,255,0.022)",
                border: "1px solid rgba(255,255,255,0.065)",
              }}
            >
              <span className="label-upper">Visible Sections</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 7 }}>
                {visibleSections.map((s) => (
                  <span
                    key={s}
                    style={{
                      fontSize: 10,
                      padding: "2px 8px",
                      borderRadius: 4,
                      background: "rgba(217,119,6,0.08)",
                      color: "#c97a1a",
                      border: "1px solid rgba(217,119,6,0.14)",
                      fontWeight: 600,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
