"use client";

export type ErrorStateProps = {
  title: string;
  description?: string;
  retryLabel?: string;
  onRetry?: () => void;
  debugCode?: string;
};

export function ErrorState({ title, description, retryLabel = "Retry", onRetry, debugCode }: ErrorStateProps) {
  return (
    <div className="rounded-md border border-red-200 bg-red-50 p-4">
      <div className="text-sm font-semibold text-red-800">{title}</div>
      {description ? <p className="mt-1 text-xs leading-5 text-red-700">{description}</p> : null}
      <div className="mt-3 flex items-center gap-3">
        {onRetry ? (
          <button className="h-8 rounded-md border border-red-200 bg-white px-3 text-sm font-semibold text-red-700 hover:bg-red-100" type="button" onClick={onRetry}>
            {retryLabel}
          </button>
        ) : null}
        {debugCode ? <span className="text-[11px] font-medium text-red-700">Support code: {debugCode}</span> : null}
      </div>
    </div>
  );
}
