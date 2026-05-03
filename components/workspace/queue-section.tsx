import Link from "next/link";
import { EmptyState } from "@/components/feedback/empty-state";

export type QueueSectionProps<T> = {
  title: string;
  description?: string;
  count?: number;
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  maxVisibleItems?: number;
  viewAllHref?: string;
};

export function QueueSection<T>({
  title,
  description,
  count,
  items,
  renderItem,
  emptyTitle,
  emptyDescription,
  maxVisibleItems,
  viewAllHref,
}: QueueSectionProps<T>) {
  const visibleItems = typeof maxVisibleItems === "number" ? items.slice(0, maxVisibleItems) : items;
  const hiddenCount = items.length - visibleItems.length;
  const tone = getSectionTone(title);

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.05)]">
      <div className={["h-1", tone.accent].join(" ")} />
      <div className={["flex items-start justify-between gap-3 border-b border-slate-200 px-3 py-2", tone.header].join(" ")}>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="truncate text-sm font-semibold text-slate-950">{title}</h2>
            <span className={["inline-flex h-5 min-w-5 items-center justify-center rounded-full border bg-white px-1.5 text-[11px] font-bold", tone.count].join(" ")}>{count ?? items.length}</span>
          </div>
          {description ? <p className="mt-0.5 line-clamp-1 text-xs leading-5 text-slate-500">{description}</p> : null}
        </div>
        {viewAllHref ? (
          <Link className="shrink-0 text-xs font-semibold text-teal-700 hover:text-teal-800" href={viewAllHref}>
            View all
          </Link>
        ) : null}
      </div>

      <div className={["p-2", tone.body].join(" ")}>
        {visibleItems.length ? (
          <div className="space-y-2">
            {visibleItems.map((item, index) => (
              <div key={index}>{renderItem(item, index)}</div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-slate-200 bg-white p-2">
            <EmptyState
              title={emptyTitle ?? `No active items in ${title.toLowerCase()}.`}
              description={emptyDescription ?? "This queue is clear for now. New workflow items will appear here when action is needed."}
            />
          </div>
        )}
        {hiddenCount > 0 ? <div className="px-2 pt-2 text-xs font-medium text-slate-500">{hiddenCount} more item(s) hidden by this view.</div> : null}
      </div>
    </section>
  );
}

function getSectionTone(title: string): {
  accent: string;
  header: string;
  body: string;
  count: string;
} {
  const normalized = title.toLowerCase();

  if (normalized.includes("needs")) {
    return {
      accent: "bg-amber-400",
      header: "bg-amber-50/80",
      body: "bg-amber-50/25",
      count: "border-amber-200 text-amber-900",
    };
  }

  if (normalized.includes("progress")) {
    return {
      accent: "bg-sky-400",
      header: "bg-sky-50/80",
      body: "bg-sky-50/25",
      count: "border-sky-200 text-sky-900",
    };
  }

  if (normalized.includes("billing")) {
    return {
      accent: "bg-teal-500",
      header: "bg-teal-50/80",
      body: "bg-teal-50/20",
      count: "border-teal-200 text-teal-900",
    };
  }

  if (normalized.includes("closed")) {
    return {
      accent: "bg-emerald-400",
      header: "bg-emerald-50/70",
      body: "bg-emerald-50/15",
      count: "border-emerald-200 text-emerald-900",
    };
  }

  return {
    accent: "bg-slate-300",
    header: "bg-slate-50",
    body: "bg-slate-50/40",
    count: "border-slate-200 text-slate-800",
  };
}
