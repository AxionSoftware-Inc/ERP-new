import { ActionButton, type ActionButtonAction } from "@/components/actions/action-button";

export type StickyCommandBarProps = {
  primaryAction?: ActionButtonAction;
  actions?: ActionButtonAction[];
  dangerActions?: ActionButtonAction[];
};

export function StickyCommandBar({ primaryAction, actions = [], dangerActions = [] }: StickyCommandBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-md border border-slate-200 bg-white/95 p-2 shadow-sm backdrop-blur">
      {primaryAction ? <ActionButton action={primaryAction} size="md" /> : null}
      {actions.map((action) => (
        <ActionButton action={{ ...action, variant: action.variant ?? "secondary" }} key={action.label} />
      ))}
      {dangerActions.length ? <div className="mx-1 h-6 w-px bg-slate-200" /> : null}
      {dangerActions.map((action) => (
        <ActionButton action={{ ...action, variant: "danger" }} key={action.label} />
      ))}
    </div>
  );
}
