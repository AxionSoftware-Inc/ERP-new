import type { BranchSummary, DepartmentSummary } from "@/lib/types/shared";
import { ActionButton, type ActionButtonAction } from "@/components/actions/action-button";

export type WorkspaceHeaderProps = {
  title: string;
  subtitle?: string;
  branch?: BranchSummary;
  department?: DepartmentSummary;
  meta?: {
    label: string;
    value: string;
  }[];
  primaryAction?: ActionButtonAction;
};

export function WorkspaceHeader({ title, subtitle, branch, department, meta = [], primaryAction }: WorkspaceHeaderProps) {
  const contextMeta = [
    branch ? { label: "Branch", value: branch.name } : null,
    department ? { label: "Department", value: department.name } : null,
    ...meta,
  ].filter((item): item is { label: string; value: string } => item !== null);

  return (
    <section className="flex items-start justify-between gap-4 rounded-md border border-slate-200 bg-white p-4">
      <div className="min-w-0">
        <h1 className="truncate text-xl font-semibold text-slate-950">{title}</h1>
        {subtitle ? <p className="mt-1 max-w-3xl text-sm leading-5 text-slate-600">{subtitle}</p> : null}
        {contextMeta.length ? (
          <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
            {contextMeta.map((item) => (
              <div className="flex items-center gap-1 text-xs" key={`${item.label}-${item.value}`}>
                <dt className="font-semibold text-slate-500">{item.label}:</dt>
                <dd className="text-slate-700">{item.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
      {primaryAction ? <ActionButton action={primaryAction} size="md" /> : null}
    </section>
  );
}
