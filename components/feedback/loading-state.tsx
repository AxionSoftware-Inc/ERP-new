export type LoadingStateProps = {
  variant?: "workspace" | "table" | "detail" | "section";
};

const rowCountByVariant: Record<NonNullable<LoadingStateProps["variant"]>, number> = {
  workspace: 5,
  table: 8,
  detail: 6,
  section: 3,
};

export function LoadingState({ variant = "section" }: LoadingStateProps) {
  const rows = Array.from({ length: rowCountByVariant[variant] }, (_, index) => index);

  return (
    <div className="space-y-2 rounded-md border border-slate-200 bg-white p-3" aria-busy="true" aria-live="polite">
      <div className="h-3 w-32 rounded bg-slate-200" />
      {rows.map((row) => (
        <div className="grid grid-cols-[1.4fr_1fr_120px] gap-3 rounded-md border border-slate-100 p-2" key={row}>
          <div className="space-y-2">
            <div className="h-3 w-3/4 rounded bg-slate-200" />
            <div className="h-2.5 w-1/2 rounded bg-slate-100" />
          </div>
          <div className="h-3 self-center rounded bg-slate-100" />
          <div className="h-7 rounded bg-slate-200" />
        </div>
      ))}
    </div>
  );
}
