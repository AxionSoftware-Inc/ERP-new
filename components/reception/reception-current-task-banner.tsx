import Link from "next/link";

export type ReceptionCurrentTask = {
  eyebrow: string;
  title: string;
  description: string;
  severity: "normal" | "warning" | "critical";
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryActions: {
    label: string;
    href: string;
  }[];
  meta: {
    label: string;
    value: string;
  }[];
};

const severityClass: Record<ReceptionCurrentTask["severity"], string> = {
  normal: "border-teal-200 bg-white",
  warning: "border-amber-300 bg-white",
  critical: "border-red-300 bg-white",
};

const accentClass: Record<ReceptionCurrentTask["severity"], string> = {
  normal: "bg-teal-600",
  warning: "bg-amber-500",
  critical: "bg-red-600",
};

export function ReceptionCurrentTaskBanner({ task }: { task: ReceptionCurrentTask }) {
  return (
    <section className={["overflow-hidden rounded-md border shadow-[0_1px_2px_rgba(15,23,42,0.06)]", severityClass[task.severity]].join(" ")}>
      <div className={["h-1", accentClass[task.severity]].join(" ")} />
      <div className="grid gap-3 p-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="min-w-0">
          <div className="text-xs font-semibold uppercase tracking-normal text-slate-500">{task.eyebrow}</div>
          <h2 className="mt-1 text-lg font-semibold text-slate-950">{task.title}</h2>
          <p className="mt-1 max-w-4xl text-sm leading-5 text-slate-600">{task.description}</p>
          <dl className="mt-3 flex flex-wrap gap-1.5">
            {task.meta.map((item) => (
              <div className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs" key={`${item.label}-${item.value}`}>
                <dt className="inline font-semibold text-slate-500">{item.label}: </dt>
                <dd className="inline font-semibold text-slate-800">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="flex flex-wrap gap-1.5 lg:justify-end">
          {task.secondaryActions.slice(0, 2).map((action) => (
            <Link className="inline-flex h-9 items-center rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50" href={action.href} key={action.href}>
              {action.label}
            </Link>
          ))}
          <Link className="inline-flex h-9 items-center rounded-md border border-teal-700 bg-teal-700 px-4 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(15,118,110,0.22)] hover:bg-teal-800" href={task.primaryAction.href}>
            {task.primaryAction.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
