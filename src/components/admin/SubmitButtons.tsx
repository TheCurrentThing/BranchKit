"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export function PendingSubmitButton({
  label,
  pendingLabel,
}: {
  label: string;
  pendingLabel?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="rounded-[0.95rem] border border-[var(--color-primary)] bg-[var(--color-primary)] px-4 py-2.5 text-[var(--color-primary-text)] shadow-[0_0_24px_rgba(181,84,61,0.18)]"
    >
      {pending ? pendingLabel ?? "Saving..." : label}
    </Button>
  );
}

export function PendingDeleteButton({
  label,
  pendingLabel,
}: {
  label: string;
  pendingLabel?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="outline"
      disabled={pending}
      className="rounded-[0.95rem] border-red-400/35 bg-red-500/10 text-red-100 hover:bg-red-500/16"
    >
      {pending ? pendingLabel ?? "Deleting..." : label}
    </Button>
  );
}
