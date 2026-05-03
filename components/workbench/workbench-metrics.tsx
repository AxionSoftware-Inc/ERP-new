import Link from "next/link";

export type WorkbenchMetric = {
  label: string;
  value: number | string;
  href?: string;
  tone?: "neutral" | "accent" | "warning" | "danger" | "success";
};

const toneClass: Record<NonNullable<WorkbenchMetric["tone"]>, string> = {
  neutral: "bg-slate-200",
  accent: "bg-teal-600",
  warning: "bg-amber-500",
  danger: "bg-red-600",
  success: "bg-emerald-600",
};

export function WorkbenchMetrics({ metrics }: { metrics: WorkbenchMetric[] }) {
  return (
    <div className="grid grid-cols-2 gap-2 lg:grid-cols-5">
      {metrics.map((metric) => {
        const content = (
          <>
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-[11px] font-semibold uppercase tracking-normal text-slate-500">{metric.label}</span>
              <span className={["h-1.5 w-8 rounded-full", toneClass[metric.tone ?? "neutral"]].join(" ")} />
            </div>
            <div className="mt-1 text-xl font-semibold leading-7 text-slate-950">{metric.value}</div>
          </>
        );

        if (metric.href) {
          return (
            <Link
              className="rounded-md border border-slate-200 bg-white px-3 py-2 shadow-[0_1px_1px_rgba(15,23,42,0.03)] hover:border-teal-200 hover:bg-slate-50"
              href={metric.href}
              key={metric.label}
            >
              {content}
            </Link>
          );
        }

        return (
          <div className="rounded-md border border-slate-200 bg-white px-3 py-2 shadow-[0_1px_1px_rgba(15,23,42,0.03)]" key={metric.label}>
            {content}
          </div>
        );
      })}
    </div>
  );
}
