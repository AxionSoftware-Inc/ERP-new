export type RoutePlaceholderPageProps = {
  title: string;
  route: string;
  pageType: string;
  purpose: string;
};

export function RoutePlaceholderPage({ title, route, pageType, purpose }: RoutePlaceholderPageProps) {
  return (
    <section className="rounded-md border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-normal text-teal-700">Placeholder</p>
          <h1 className="mt-1 text-xl font-semibold text-slate-950">{title}</h1>
          <p className="mt-1 text-sm text-slate-600">{purpose}</p>
        </div>
        <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800">Placeholder</span>
      </div>

      <dl className="mt-4 grid gap-2 sm:grid-cols-3">
        <div className="rounded-md border border-slate-100 bg-slate-50 px-3 py-2">
          <dt className="text-[11px] font-semibold uppercase tracking-normal text-slate-500">Route</dt>
          <dd className="mt-1 font-mono text-sm text-slate-800">{route}</dd>
        </div>
        <div className="rounded-md border border-slate-100 bg-slate-50 px-3 py-2">
          <dt className="text-[11px] font-semibold uppercase tracking-normal text-slate-500">Page type</dt>
          <dd className="mt-1 text-sm font-medium text-slate-800">{pageType}</dd>
        </div>
        <div className="rounded-md border border-slate-100 bg-slate-50 px-3 py-2">
          <dt className="text-[11px] font-semibold uppercase tracking-normal text-slate-500">Implementation status</dt>
          <dd className="mt-1 text-sm font-medium text-slate-800">Placeholder</dd>
        </div>
      </dl>
    </section>
  );
}
