import type { ReactNode } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { isSupabaseConfigured } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import type { AdminNavItem, AdminSectionKey } from "@/types/admin";

const adminNavItems: AdminNavItem[] = [
  {
    key: "overview",
    label: "Overview",
    href: "/admin",
    description: "See what needs attention today",
  },
  {
    key: "setup",
    label: "Setup",
    href: "/admin/setup",
    description: "Walk through first-time setup",
  },
  {
    key: "branding",
    label: "Branding",
    href: "/admin/branding",
    description: "Logo, colors, fonts, business look",
  },
  {
    key: "homepage",
    label: "Homepage",
    href: "/admin/homepage",
    description: "Hero, announcement, homepage sections",
  },
  {
    key: "menu",
    label: "Menu",
    href: "/admin/menu",
    description: "Menu sections, items, prices",
  },
  {
    key: "specials",
    label: "Specials",
    href: "/admin/specials",
    description: "Today's specials and banner updates",
  },
  {
    key: "hours",
    label: "Hours",
    href: "/admin/hours",
    description: "Open hours and quick summary",
  },
  {
    key: "photos",
    label: "Photos",
    href: "/admin/photos",
    description: "Gallery image links and captions",
  },
  {
    key: "contact",
    label: "Contact Info",
    href: "/admin/contact",
    description: "Phone, address, email, social links",
  },
  {
    key: "settings",
    label: "Settings",
    href: "/admin/settings",
    description: "Site switches and visibility options",
  },
];

export function AdminShell({
  title,
  description,
  children,
  brandName,
  activeKey,
  eyebrow,
  mainClassName,
  contentClassName,
  previewHref,
}: {
  title: string;
  description: string;
  children: ReactNode;
  brandName: string;
  activeKey: AdminSectionKey;
  eyebrow?: string;
  mainClassName?: string;
  contentClassName?: string;
  previewHref?: string;
}) {
  const activeItem =
    adminNavItems.find((item) => item.key === activeKey) ?? adminNavItems[0];

  return (
    <div className="admin-terminal-shell min-h-screen text-zinc-100">
      <div className="admin-grid-bg mx-auto grid min-h-screen max-w-[1800px] gap-0 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div className="lg:h-screen">
          <AdminSidebar
            brandName={brandName}
            items={adminNavItems}
            persistenceEnabled={isSupabaseConfigured()}
          />
        </div>

        <main
          className={cn(
            "flex min-h-screen min-w-0 flex-col overflow-hidden px-4 py-4 sm:px-5 lg:h-screen lg:px-6 lg:py-5",
            mainClassName,
          )}
        >
          <AdminHeader
            eyebrow={eyebrow ?? activeItem.label}
            title={title}
            description={description}
            previewHref={previewHref}
          />
          <div
            className={cn(
              "admin-scrollbar min-h-0 flex-1 overflow-y-auto pb-2 pr-1 pt-4",
              contentClassName,
            )}
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
