import { ActionButton, type ActionButtonAction } from "@/components/actions/action-button";
import { StatusBadge } from "@/components/status/status-badge";
import type { StatusBadgeData } from "@/lib/types/shared";

export type DetailHeaderMetaItem = {
  label: string;
  value: string;
};

export type DetailHeaderProps = {
  title: string;
  subtitle?: string;
  badges?: StatusBadgeData[];
  meta?: DetailHeaderMetaItem[];
  primaryAction?: ActionButtonAction;
};

export function DetailHeader({ title, subtitle, badges = [], meta = [], primaryAction }: DetailHeaderProps) {
  return (
    <header className="rounded-md border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="truncate text-xl font-semibold text-slate-950">{title}</h1>
            {badges.map((badge) => (
              <StatusBadge badge={badge} key={`${badge.label}-${badge.tone}`} />
            ))}
          </div>
          {subtitle ? <p className="mt-1 text-sm leading-5 text-slate-600">{subtitle}</p> : null}
        </div>
        {primaryAction ? <ActionButton action={primaryAction} size="md" /> : null}
      </div>
      {meta.length ? (
        <dl className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {meta.map((item) => (
            <div className="rounded-md border border-slate-100 bg-slate-50 px-3 py-2" key={`${item.label}-${item.value}`}>
              <dt className="text-[11px] font-semibold uppercase tracking-normal text-slate-500">{item.label}</dt>
              <dd className="mt-0.5 truncate text-sm font-medium text-slate-800">{item.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </header>
  );
}
