import Link from "next/link";
import type { ReactNode } from "react";

export type DoctorPlaceholderPageProps = {
  title: string;
  route: string;
  purpose: string;
  sections: string[];
  actions: string[];
  children?: ReactNode;
};

export function DoctorPlaceholderPage({
  title,
  route,
  purpose,
  sections,
  actions,
  children,
}: DoctorPlaceholderPageProps) {
  return (
    <section className="space-y-3">
      <div className="rounded-md border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="min-w-0">
            <div className="text-xs font-semibold uppercase tracking-normal text-indigo-700">
              Doctor module route shell
            </div>
            <h1 className="mt-1 text-xl font-semibold text-slate-950">{title}</h1>
            <p className="mt-1 max-w-4xl text-sm leading-5 text-slate-600">{purpose}</p>
          </div>
          <Link
            className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-white hover:text-slate-950"
            href="/app/doctor"
          >
            Back to Overview
          </Link>
        </div>

        <dl className="mt-3 grid gap-2 md:grid-cols-3">
          <div className="rounded-md border border-slate-100 bg-slate-50 px-3 py-2">
            <dt className="text-[11px] font-semibold uppercase tracking-normal text-slate-500">Route</dt>
            <dd className="mt-1 font-mono text-sm text-slate-800">{route}</dd>
          </div>
          <div className="rounded-md border border-slate-100 bg-slate-50 px-3 py-2">
            <dt className="text-[11px] font-semibold uppercase tracking-normal text-slate-500">Status</dt>
            <dd className="mt-1 text-sm font-medium text-slate-800">Doctor module route shell</dd>
          </div>
          <div className="rounded-md border border-slate-100 bg-slate-50 px-3 py-2">
            <dt className="text-[11px] font-semibold uppercase tracking-normal text-slate-500">Scope</dt>
            <dd className="mt-1 text-sm font-medium text-slate-800">Discoverable navigation and preview</dd>
          </div>
        </dl>

        <div className="mt-3 grid gap-2 lg:grid-cols-2">
          <PlanList title="Planned sections" items={sections} />
          <PlanList title="Planned actions" items={actions} />
        </div>
      </div>

      {children}
    </section>
  );
}

function PlanList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-md border border-slate-100 bg-white px-3 py-2">
      <h2 className="text-sm font-semibold text-slate-950">{title}</h2>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span
            className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700"
            key={item}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
