import {
  deleteMenuItemAction,
  saveMenuItemAction,
} from "@/app/admin/actions";
import {
  AdminCard,
  AdminInput,
  DeleteButton,
  HiddenField,
  SaveButton,
} from "@/components/admin/FormPrimitives";
import type { MenuCategory, MenuItem } from "@/types/menu";

type MenuItemEditorPanelProps = {
  category: MenuCategory | null;
  item: MenuItem | null;
  isCreating: boolean;
};

export function MenuItemEditorPanel({
  category,
  item,
  isCreating,
}: MenuItemEditorPanelProps) {
  if (!category) {
    return (
      <AdminCard
        title="Item editor"
        description="This panel stays focused on one item at a time."
        eyebrow="Selected Item"
        className="min-h-0 rounded-[1.5rem]"
      >
        <div className="rounded-[1rem] border border-dashed border-white/[0.12] bg-black/20 p-5 text-sm text-white/60">
          Create or select a menu section first.
        </div>
      </AdminCard>
    );
  }

  if (!item && !isCreating) {
      return (
      <AdminCard
        title="Pick an item"
        description="Edit one item at a time after you choose it from the list."
        eyebrow="Selected Item"
        className="min-h-0 rounded-[1.5rem]"
      >
        <div className="rounded-[1rem] border border-dashed border-white/[0.12] bg-black/20 p-5 text-sm text-white/60">
          {category.items.length > 0
            ? "Start by selecting a menu item from the middle list."
            : "No items yet. Add your first item from the item list."}
        </div>
      </AdminCard>
    );
  }

  const itemName = item?.name ?? "";
  const itemPrice = item ? item.price.toFixed(2) : "";
  const itemDescription = item?.description ?? "";
  const itemSortOrder = item?.sortOrder ?? category.items.length + 1;
  const itemTags = item?.tags.join(", ") ?? "";
  const itemIsActive = item?.isActive ?? true;
  const itemIsSoldOut = item?.isSoldOut ?? false;
  const itemIsFeatured = item?.isFeatured ?? false;
  const baseFieldClassName =
    "mt-1 w-full rounded-[1rem] border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[var(--color-primary)] focus:bg-black/40";
  const compactFieldClassName =
    "mt-1 w-full rounded-[1rem] border border-white/10 bg-black/30 px-4 py-3 text-right text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[var(--color-primary)] focus:bg-black/40";
  const toggleClassName =
    "flex items-center gap-2 rounded-[1rem] border border-white/10 bg-black/30 px-4 py-3 text-sm text-white transition hover:border-white/16";

  return (
    <AdminCard
      title={isCreating ? "Add an item" : item?.name ?? "Edit item"}
      description={
        isCreating
          ? "Keep this simple: name, price, description, and whether the item is live."
          : "Fast edits first: name, price, description, and live status."
      }
      eyebrow="Selected Item"
      className="admin-scrollbar min-h-0 overflow-hidden rounded-[1.5rem]"
      bodyClassName="admin-scrollbar max-h-[calc(100vh-22rem)] space-y-4 overflow-y-auto"
    >
      <form action={saveMenuItemAction} className="space-y-4">
        <HiddenField
          name="redirect_to"
          value={`/admin/menu?category=${category.id}${item ? `&item=${item.id}` : ""}`}
        />
        <HiddenField name="category_id" value={category.id} />
        {item ? <HiddenField name="menu_item_id" value={item.id} /> : null}

        <div className="space-y-4">
          <div>
            <label className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/48">
              Item Name
            </label>
            <input
              name="name"
              type="text"
              defaultValue={itemName}
              required
              className={baseFieldClassName}
              placeholder="Biscuits & Gravy"
            />
          </div>

          <div>
            <label className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/48">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={itemDescription}
              required
              rows={3}
              className={baseFieldClassName}
              placeholder="House-made sausage gravy over split biscuits."
            />
          </div>

          <div className="max-w-[120px]">
            <label className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/48">
              Price
            </label>
            <input
              name="price"
              type="number"
              inputMode="decimal"
              step="0.01"
              min="0"
              defaultValue={itemPrice}
              required
              className={compactFieldClassName}
              placeholder="6.99"
            />
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <label className={toggleClassName}>
              <input
                name="is_active"
                type="checkbox"
                defaultChecked={itemIsActive}
                className="h-4 w-4 accent-[var(--color-primary)]"
              />
              Show on site
            </label>
            <label className={toggleClassName}>
              <input
                name="is_sold_out"
                type="checkbox"
                defaultChecked={itemIsSoldOut}
                className="h-4 w-4 accent-[var(--color-primary)]"
              />
              Sold out
            </label>
            <label className={toggleClassName}>
              <input
                name="is_featured"
                type="checkbox"
                defaultChecked={itemIsFeatured}
                className="h-4 w-4 accent-[var(--color-primary)]"
              />
              Featured
            </label>
          </div>
        </div>

        <details className="rounded-[1rem] border border-white/10 bg-black/20">
          <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold text-white">
            Customize item
          </summary>
          <div className="space-y-4 border-t border-white/10 px-4 py-4">
            <p className="text-sm text-white/50">
              Advanced options are only needed for items with add-ons or choices.
              Most restaurants can ignore this section most of the time.
            </p>
            <div className="grid gap-4 md:grid-cols-[160px_1fr]">
              <AdminInput
                label="Sort Order"
                name="sort_order"
                type="number"
                defaultValue={itemSortOrder}
              />
              <AdminInput
                label="Tags"
                name="tags"
                defaultValue={itemTags}
                placeholder="Popular, House Favorite"
              />
            </div>
            <div className="rounded-[1rem] border border-dashed border-white/[0.1] bg-black/15 p-4 text-sm text-white/50">
              Add-ons, required choice groups, and multi-select options are part of
              the menu data model, but they are not edited here by default. This
              keeps everyday menu updates simpler for owners.
            </div>
          </div>
        </details>

        <div className="flex flex-wrap gap-3">
          <SaveButton label={isCreating ? "Add Item" : "Save Item"} />
          {item ? (
            <a
              href={`/admin/menu?category=${category.id}`}
              className="inline-flex items-center justify-center rounded-xl border border-[var(--color-primary)] px-4 py-2.5 text-sm font-semibold text-[var(--color-primary)] transition hover:bg-[color:rgba(165,60,47,0.12)]"
            >
              Done Editing
            </a>
          ) : null}
        </div>
      </form>

      {item ? (
        <form action={deleteMenuItemAction}>
          <HiddenField
            name="redirect_to"
            value={`/admin/menu?category=${category.id}`}
          />
          <HiddenField name="category_id" value={category.id} />
          <HiddenField name="menu_item_id" value={item.id} />
          <DeleteButton label="Delete Item" />
        </form>
      ) : null}
    </AdminCard>
  );
}

