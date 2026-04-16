import { Card, CardContent } from "@/components/ui/card";

type SearchValue = string | string[] | undefined;

function getFirstValue(value: SearchValue) {
  return Array.isArray(value) ? value[0] : value;
}

export function AdminFeedback({
  searchParams,
}: {
  searchParams?: Record<string, SearchValue>;
}) {
  const status = getFirstValue(searchParams?.status);
  const error = getFirstValue(searchParams?.error);

  if (!status && !error) {
    return null;
  }

  const toneClasses = error
    ? "border-red-500/30 bg-red-500/10 text-red-100"
    : "border-emerald-500/30 bg-emerald-500/10 text-emerald-100";

  return (
    <Card className={`admin-panel rounded-[1.25rem] ${toneClasses}`}>
      <CardContent className="px-4 py-3 text-sm font-medium">
        {error ?? status}
      </CardContent>
    </Card>
  );
}
