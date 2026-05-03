"use client";

import { usePathname } from "next/navigation";
import type { BranchSummary, UserSummary } from "@/lib/types/shared";
import { getNavItemForPath } from "@/lib/navigation/app-nav";

export type TopbarProps = {
  title?: string;
  breadcrumb?: {
    label: string;
    href?: string;
  }[];
  currentBranch?: BranchSummary;
  currentUser?: UserSummary;
  notificationCount?: number;
  onSearch?: (query: string) => void;
};

export function Topbar({
  title,
  breadcrumb,
  currentBranch,
  currentUser,
  notificationCount = 3,
  onSearch,
}: TopbarProps) {
  const pathname = usePathname();
  const activeItem = getNavItemForPath(pathname);
  const moduleTitle = title ?? activeItem?.label ?? "Clinic ERP";

  return (
    <header className="grid h-12 grid-cols-[minmax(180px,280px)_minmax(240px,1fr)_auto] items-center gap-3 border-b border-slate-200 bg-white px-4">
      <div className="min-w-0">
        <div className="truncate text-sm font-semibold text-slate-950">{moduleTitle}</div>
        {breadcrumb?.length ? (
          <div className="truncate text-[11px] text-slate-500">{breadcrumb.map((item) => item.label).join(" / ")}</div>
        ) : (
          <div className="truncate text-[11px] text-slate-500">{activeItem?.group ?? "Global"} workspace</div>
        )}
      </div>

      <label className="relative block min-w-0">
        <span className="sr-only">Global search</span>
        <input
          className="h-8 w-full rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-teal-500 focus:bg-white"
          placeholder="Search patients, visits, invoices, lab orders..."
          type="search"
          onChange={(event) => onSearch?.(event.target.value)}
        />
      </label>

      <div className="flex items-center gap-2">
        <button
          className="h-8 rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
          type="button"
        >
          {currentBranch?.code ?? "Main branch"}
        </button>
        <button
          className="relative h-8 rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
          type="button"
          aria-label="Notifications"
        >
          Alerts
          {notificationCount > 0 ? (
            <span className="ml-2 rounded-full bg-red-600 px-1.5 py-0.5 text-[10px] font-bold text-white">{notificationCount}</span>
          ) : null}
        </button>
        <button
          className="h-8 rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          type="button"
        >
          {currentUser?.fullName ?? "Admin"}
        </button>
      </div>
    </header>
  );
}
