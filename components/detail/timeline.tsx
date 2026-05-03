import { EmptyState } from "@/components/feedback/empty-state";
import type { TimelineEvent } from "@/lib/types/shared";

export type TimelineProps = {
  events: TimelineEvent[];
  compact?: boolean;
};

export function Timeline({ events, compact = false }: TimelineProps) {
  const sortedEvents = [...events].sort((left, right) => Date.parse(right.createdAt) - Date.parse(left.createdAt));

  return (
    <section className="rounded-md border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-3 py-2">
        <h2 className="text-sm font-semibold text-slate-950">Timeline</h2>
      </div>
      <div className={compact ? "p-2" : "p-3"}>
        {sortedEvents.length ? (
          <ol className="space-y-2">
            {sortedEvents.map((event) => (
              <li className="grid grid-cols-[120px_minmax(0,1fr)] gap-3 rounded-md border border-slate-100 bg-slate-50 px-3 py-2" key={event.id}>
                <time className="text-xs font-medium text-slate-500" dateTime={event.createdAt}>
                  {formatDateTime(event.createdAt)}
                </time>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-slate-900">{event.title}</span>
                    {event.actor ? <span className="text-xs text-slate-500">by {event.actor.fullName}</span> : null}
                  </div>
                  {event.description ? <p className="mt-1 text-xs leading-5 text-slate-600">{event.description}</p> : null}
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <EmptyState title="No activity recorded yet." description="Important workflow changes and audit-ready actions will appear here." />
        )}
      </div>
    </section>
  );
}

function formatDateTime(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
