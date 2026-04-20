import type { KitCategory } from "@/types/kit";

export type MenuVariant = "editorial" | "compact" | "nightlife";

// Maps food-service category → menu presentation variant.
// Categories outside food_service never reach MenuSection so no default
// case needed — but the exhaustive fallback keeps runtime safe.
export function resolveMenuVariant(category: KitCategory): MenuVariant {
  switch (category) {
    case "restaurant":
    case "diner":
      return "editorial";

    case "cafe":
    case "food_truck":
      return "compact";

    case "bar":
    case "pop_up":
      return "nightlife";

    default:
      return "editorial";
  }
}
