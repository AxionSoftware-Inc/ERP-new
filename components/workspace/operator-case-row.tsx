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
    <article className="grid gap-2 rounded-md border border-slate-200 bg-white p-2.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-colors hover:border-slate-300 hover:bg-slate-50/60 xl:grid-cols-[minmax(260px,1.1fr)_minmax(260px,1fr)_minmax(150px,auto)]">
      <div className="min-w-0">
        <div className="flex min-w-0 items-start justify-between gap-2">
          <div className="min-w-0">
            {identity.href ? (
              <Link className="block truncate text-sm font-semibold leading-5 text-slate-950 hover:text-teal-700" href={identity.href}>
                {identity.title}
              </Link>
            ) : (
              <div className="truncate text-sm font-semibold leading-5 text-slate-950">{identity.title}</div>
            )}
            {identity.subtitle ? <div className="mt-0.5 truncate text-xs text-slate-500">{identity.subtitle}</div> : null}
          </div>
          {reference ? <span className="shrink-0 rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-xs font-semibold text-slate-700">{reference}</span> : null}
        </div>

        {context ? <div className="mt-1 truncate text-xs text-slate-600">{context}</div> : null}

        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {primaryBadge ? <StatusBadge badge={primaryBadge} size="sm" /> : null}
          {secondaryBadge ? <StatusBadge badge={secondaryBadge} size="sm" /> : null}
          {meta.slice(0, 4).map((item) => (
            <span className="rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[11px] text-slate-600" key={`${item.label}-${item.value}`}>
              <b className="font-semibold text-slate-500">{item.label}</b> {item.value}
            </span>
          ))}
        </div>
      </div>

      <div className="min-w-0 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-2">
        <div className="text-[11px] font-semibold uppercase tracking-normal text-slate-500">Keyingi amal</div>
        <div className="mt-1 rounded-md border border-teal-100 bg-white px-2 py-1">
          <NextActionLabel action={nextAction} />
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-1.5 xl:min-w-[150px] xl:flex-col xl:items-stretch xl:justify-center">
        {primaryAction ? <ActionButton action={primaryAction} size="md" /> : null}
        {secondaryActions.slice(0, 2).map((action) => (
          <ActionButton action={{ ...action, variant: action.variant ?? "secondary" }} key={action.label} />
        ))}
      </div>
    </article>
  );
}
