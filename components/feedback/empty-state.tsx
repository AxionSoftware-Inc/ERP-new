import { ActionButton, type ActionButtonAction } from "@/components/actions/action-button";

export type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ActionButtonAction;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="rounded-md border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-center">
      <div className="text-sm font-semibold text-slate-800">{title}</div>
      {description ? <p className="mx-auto mt-1 max-w-md text-xs leading-5 text-slate-500">{description}</p> : null}
      {action ? (
        <div className="mt-3">
          <ActionButton action={action} />
        </div>
      ) : null}
    </div>
  );
}
