import Link from "next/link";
import type { NextActionData, StatusBadgeData } from "@/lib/types/shared";
import { ActionButton, type ActionButtonAction } from "@/components/actions/action-button";
import { NextActionLabel } from "@/components/status/next-action-label";
import { StatusBadge } from "@/components/status/status-badge";

export type OperatorCaseRowProps = {
  identity: {
    title: string;
    subtitle?: string;
    href?: string;
  };
  reference?: string;
  context?: string;
  primaryBadge?: StatusBadgeData;
  secondaryBadge?: StatusBadgeData;
  nextAction?: NextActionData;
  primaryAction?: ActionButtonAction;
  secondaryActions?: ActionButtonAction[];
  meta?: {
    label: string;
    value: string;
  }[];
};

export function OperatorCaseRow({
  identity,
  reference,
  context,
  primaryBadge,
  secondaryBadge,
  nextAction,
  primaryAction,
  secondaryActions = [],
  meta = [],
}: OperatorCaseRowProps) {
  return (
    <article className="grid gap-2.5 rounded-xl border border-slate-200 bg-white p-2.5 shadow-[0_1px_2px_rgba(15,23,42,0.05)] ring-1 ring-transparent transition-colors hover:border-slate-300 hover:bg-slate-50/50 hover:ring-slate-200/70 lg:grid-cols-[minmax(250px,1.15fr)_minmax(245px,0.95fr)_minmax(150px,auto)]">
      <div className="min-w-0 border-l-2 border-slate-200 pl-2.5">
        {identity.href ? (
          <Link className="block truncate text-sm font-semibold leading-5 text-slate-950 hover:text-teal-700" href={identity.href}>
            {identity.title}
          </Link>
        ) : (
          <div className="truncate text-sm font-semibold leading-5 text-slate-950">{identity.title}</div>
        )}
        {identity.subtitle ? <div className="mt-0.5 truncate text-xs text-slate-500">{identity.subtitle}</div> : null}
        <div className="mt-1.5 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-xs">
          {reference ? <span className="font-semibold text-slate-800">{reference}</span> : null}
          {context ? <span className="min-w-0 truncate text-slate-500 before:mr-2 before:text-slate-300 before:content-['/']">{context}</span> : null}
        </div>
      </div>

      <div className="min-w-0 space-y-1.5 rounded-lg border border-slate-200 bg-slate-50/80 px-2.5 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
        <div className="flex flex-wrap items-center gap-1.5">
          {primaryBadge ? <StatusBadge badge={primaryBadge} /> : null}
          {secondaryBadge ? <StatusBadge badge={secondaryBadge} /> : null}
        </div>
        <div className="rounded-md border border-teal-100 bg-white px-2 py-1 shadow-[0_1px_0_rgba(15,23,42,0.03)]">
          <NextActionLabel action={nextAction} />
        </div>
        {meta.length ? (
          <dl className="flex flex-wrap gap-1 text-[10.5px] text-slate-600">
            {meta.map((item) => (
              <div className="inline-flex max-w-full items-center gap-1 rounded-full border border-slate-200 bg-white/80 px-1.5 py-0.5" key={`${item.label}-${item.value}`}>
                <dt className="shrink-0 font-semibold text-slate-500">{item.label}</dt>
                <dd className="truncate text-slate-700">{item.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-1.5 lg:min-w-[150px] lg:flex-col lg:items-stretch lg:justify-center">
        {primaryAction ? <ActionButton action={primaryAction} size="md" /> : null}
        {secondaryActions.slice(0, 2).map((action) => (
          <ActionButton action={{ ...action, variant: action.variant ?? "secondary" }} key={action.label} />
        ))}
      </div>
    </article>
  );
}
