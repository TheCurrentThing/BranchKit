import { AdminFeedback } from "@/components/admin/AdminFeedback";
import { MenuCategoryPanel } from "@/components/admin/MenuCategoryPanel";
import { MenuItemEditorPanel } from "@/components/admin/MenuItemEditorPanel";
import { MenuItemListPanel } from "@/components/admin/MenuItemListPanel";
import { MenuSectionList } from "@/components/admin/MenuSectionList";
import { AdminShell } from "@/components/admin/AdminShell";
import { PreviewLink } from "@/components/admin/FormPrimitives";
import { getAdminSitePayload } from "@/lib/queries";

type AdminPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

function readParam(
  searchParams: Record<string, string | string[] | undefined> | undefined,
  key: string,
) {
  const value = searchParams?.[key];
  return Array.isArray(value) ? value[0] ?? null : value ?? null;
}

export default async function AdminMenuPage({ searchParams }: AdminPageProps) {
  const payload = await getAdminSitePayload();
  const itemCount = payload.menuCategories.reduce(
    (total, category) => total + category.items.length,
    0,
  );
  const liveItemCount = payload.menuCategories.reduce(
    (total, category) => total + category.items.filter((item) => item.isActive).length,
    0,
  );

  const requestedCategoryId = readParam(searchParams, "category");
  const selectedCategory =
    payload.menuCategories.find((category) => category.id === requestedCategoryId) ??
    payload.menuCategories[0] ??
    null;

  const requestedItemId = readParam(searchParams, "item");
  const isCreatingItem = requestedItemId === "new" && Boolean(selectedCategory);
  const selectedItem =
    selectedCategory?.items.find((item) => item.id === requestedItemId) ??
    (isCreatingItem ? null : selectedCategory?.items[0] ?? null);

  return (
    <AdminShell
      activeKey="menu"
      brandName={payload.brand.businessName}
      eyebrow="Menu System"
      title="Menu System Console"
      description="Work the menu like a system. Choose a category, inspect the item table, then edit one record at a time without losing the rest of the board."
      previewHref="/menu"
      contentClassName="min-h-0 flex flex-1 flex-col overflow-hidden"
    >
      <AdminFeedback searchParams={searchParams} />

      <div className="grid min-h-0 flex-1 gap-4 lg:grid-rows-[auto_minmax(0,1fr)]">
        <section className="admin-panel overflow-hidden rounded-[1.5rem]">
          <div className="flex flex-col gap-4 border-b border-white/[0.08] px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
                Menu System
              </p>
              <h2 className="mt-2 text-[1.45rem] font-semibold text-white">
                Active category: {selectedCategory?.name ?? "No category selected"}
              </h2>
              <p className="mt-2 text-sm leading-6 text-white/55">
                Categories stay on the left, the item registry stays centered, and the active editor
                remains fixed on the right.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/58">
                {payload.menuCategories.length} Categories
              </div>
              <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/58">
                {itemCount} Items
              </div>
              <PreviewLink href="/menu" label="Preview Menu" />
            </div>
          </div>

          <div className="grid gap-3 px-5 py-3 text-sm text-white/50 md:grid-cols-4">
            <p>Live items: {liveItemCount}</p>
            <p>Selected item: {isCreatingItem ? "New item" : selectedItem?.name ?? "None"}</p>
            <p>Service window: {selectedCategory?.serviceWindow ?? "all-day"}</p>
            <p>Category visibility: {selectedCategory?.isActive ? "Live" : "Hidden"}</p>
          </div>
        </section>

        <div className="grid min-h-0 gap-4 xl:grid-cols-[300px_minmax(0,1fr)_420px]">
          <div className="grid min-h-0 gap-4 xl:grid-rows-[minmax(0,1fr)_auto]">
            <MenuSectionList
              categories={payload.menuCategories}
              selectedCategoryId={selectedCategory?.id ?? null}
            />

            <MenuCategoryPanel
              category={selectedCategory}
              selectedItemId={selectedItem?.id ?? null}
            />
          </div>

          <MenuItemListPanel
            category={selectedCategory}
            selectedItemId={selectedItem?.id ?? (isCreatingItem ? "new" : null)}
          />

          <MenuItemEditorPanel
            category={selectedCategory}
            item={selectedItem}
            isCreating={isCreatingItem}
          />
        </div>
      </div>
    </AdminShell>
  );
}
