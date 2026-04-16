import Link from "next/link";
import type { MenuCategory } from "@/types/menu";

export function MenuItemListPanel({
  category,
  selectedItemId,
}: {
  category: MenuCategory | null;
  selectedItemId: string | null;
}) {
  if (!category) {
    return (
      <section className="admin-panel rounded-[1.5rem] p-5">
        <p className="text-sm text-white/50">
          Create a category first, then the item registry will appear here.
        </p>
      </section>
    );
  }

  return (
    <section className="admin-panel min-h-0 overflow-hidden rounded-[1.5rem]">
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] px-5 py-4">
        <div>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
            Item Registry
          </p>
          <p className="mt-2 text-sm text-white/45">
            Terminal view for {category.name} items.
          </p>
        </div>
        <Link
          href={`/admin/menu?category=${category.id}&item=new`}
          className="rounded-[0.95rem] border border-[var(--color-primary)] bg-[var(--color-primary)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(181,84,61,0.18)] transition hover:opacity-95"
        >
          Add Item
        </Link>
      </div>

      <div className="grid grid-cols-[minmax(0,1.5fr)_110px_110px_90px] gap-3 border-b border-white/[0.08] px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/36">
        <span>Name</span>
        <span className="text-right">Price</span>
        <span className="text-right">Status</span>
        <span className="text-right">Focus</span>
      </div>

      <div className="admin-scrollbar min-h-0 overflow-y-auto">
        {category.items.length > 0 ? (
          category.items.map((item) => {
            const isSelected = item.id === selectedItemId;

            return (
              <Link
                key={item.id}
                href={`/admin/menu?category=${category.id}&item=${item.id}`}
                className={[
                  "grid grid-cols-[minmax(0,1.5fr)_110px_110px_90px] gap-3 border-b border-white/[0.06] px-5 py-4 transition",
                  isSelected
                    ? "bg-[linear-gradient(90deg,rgba(181,84,61,0.18),rgba(181,84,61,0.04))]"
                    : "hover:bg-white/[0.03]",
                ].join(" ")}
              >
                <div className="min-w-0">
                  <p className="truncate font-semibold text-white">{item.name}</p>
                  <p className="mt-1 truncate text-xs text-white/48">{item.description}</p>
                </div>

                <div className="text-right text-sm font-semibold text-white">
                  ${item.price.toFixed(2)}
                </div>

                <div className="text-right">
                  <span
                    className={[
                      "inline-flex rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em]",
                      item.isActive
                        ? "bg-emerald-400/15 text-emerald-200"
                        : "bg-white/[0.06] text-white/45",
                    ].join(" ")}
                  >
                    {item.isSoldOut ? "Sold Out" : item.isActive ? "Live" : "Hidden"}
                  </span>
                </div>

                <div className="text-right">
                  <span
                    className={[
                      "inline-flex rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em]",
                      item.isFeatured
                        ? "bg-[var(--color-primary)]/20 text-[var(--color-primary)]"
                        : "bg-white/[0.05] text-white/38",
                    ].join(" ")}
                  >
                    {item.isFeatured ? "Primary" : "--"}
                  </span>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="px-5 py-6 text-sm text-white/50">No items yet. Add your first item.</div>
        )}
      </div>
    </section>
  );
}
