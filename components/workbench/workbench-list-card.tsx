import Link from "next/link";
import type { ReactNode } from "react";

export type WorkbenchSelectorItem = {
  key: string;
  label: string;
  count: number;
  href: string;
};

export function WorkbenchListCard({
  title,
  summary,
  selector,
  selectedKey,
  filters,
  fullListHref,
  fullListLabel,
  searchPlaceholder,
  children,
}: {
  title: string;
  summary: string;
  selector: WorkbenchSelectorItem[];
  selectedKey: string;
  filters?: string[];
  fullListHref: string;
  fullListLabel: string;
  searchPlaceholder?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-md border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 p-2">
        <div className="min-w-0 px-1">
          <h2 className="text-sm font-semibold text-slate-950">{title}</h2>
          <p className="mt-0.5 text-xs text-slate-500">{summary}</p>
        </div>
        <div className="flex items-center gap-2">
          {searchPlaceholder ? (
            <input
              className="h-8 w-52 rounded-md border border-slate-200 bg-slate-50 px-2.5 text-xs text-slate-900 outline-none placeholder:text-slate-400 focus:border-teal-500 focus:bg-white"
              placeholder={searchPlaceholder}
              type="search"
            />
          ) : null}
          <Link className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-white" href={fullListHref}>
            {fullListLabel}
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 p-2">
        <div className="flex flex-wrap gap-1">
          {selector.map((item) => {
            const active = selectedKey === item.key;
            return (
              <Link
                className={[
                  "inline-flex h-7 items-center gap-1.5 rounded-md border px-2 text-xs font-semibold",
                  active ? "border-teal-300 bg-teal-50 text-teal-900" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
                ].join(" ")}
                href={item.href}
                key={item.key}
              >
                <span>{item.label}</span>
                <span className="font-mono text-[11px]">{item.count}</span>
              </Link>
            );
          })}
        </div>
        {filters?.length ? (
          <div className="flex flex-wrap gap-1">
            {filters.map((filter) => (
              <span className="rounded border border-slate-200 bg-slate-50 px-1.5 py-1 text-[11px] font-medium text-slate-600" key={filter}>
                {filter}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <div>{children}</div>
    </section>
  );
}
