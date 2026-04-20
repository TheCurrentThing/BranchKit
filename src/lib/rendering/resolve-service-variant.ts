import type { KitCategory } from "@/types/kit";

export type ServiceVariant = "urgent" | "scheduled" | "proof" | "streamlined";

// Maps services-family category → service presentation variant.
// Categories outside services never reach ServicesSection so the
// default fallback is a safety net, not a common path.
export function resolveServiceVariant(category: KitCategory): ServiceVariant {
  switch (category) {
    case "on_demand":
    case "mobile":
      return "urgent";

    case "scheduled":
      return "scheduled";

    case "project":
    case "professional":
      return "proof";

    default:
      return "streamlined";
  }
}
