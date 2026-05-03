import type { NextActionData } from "@/lib/types/shared";

export type NextActionLabelProps = {
  action?: NextActionData | null;
  prefix?: string;
};

export function NextActionLabel({ action, prefix = "Next:" }: NextActionLabelProps) {
  if (!action || action.disabled) {
    return <span className="text-xs font-medium text-slate-500">{prefix} No operational action</span>;
  }

  return (
    <span className="text-xs text-slate-600">
      <span className="font-semibold text-slate-700">{prefix}</span> {action.label}
    </span>
  );
}
