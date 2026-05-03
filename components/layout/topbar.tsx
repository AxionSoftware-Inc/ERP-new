"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BellOutlined } from "@ant-design/icons";
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
  const receptionContext = pathname.startsWith("/app/reception");
  const doctorContext = pathname.startsWith("/app/doctor");

  return (
    <header className="grid h-12 grid-cols-[minmax(160px,240px)_minmax(240px,1fr)_auto] items-center gap-3 border-b border-slate-200 bg-white px-4">
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
        {receptionContext ? <ReceptionTopbarNav pathname={pathname} /> : null}
        {doctorContext ? <DoctorTopbarNav pathname={pathname} /> : null}
        {currentBranch ? (
          <button
            className="h-8 rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
            type="button"
          >
            {currentBranch.code}
          </button>
        ) : null}
        <button
          className="relative inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50"
          type="button"
          aria-label="Notifications"
        >
          <BellOutlined aria-hidden="true" />
          {notificationCount > 0 ? (
            <span className="absolute -right-1 -top-1 rounded-full bg-red-600 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">{notificationCount}</span>
          ) : null}
        </button>
        {currentUser ? (
          <button
            className="h-8 rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            type="button"
          >
            {currentUser.fullName}
          </button>
        ) : null}
      </div>
    </header>
  );
}

function DoctorTopbarNav({ pathname }: { pathname: string }) {
  const items = [
    { label: "Ish stoli", href: "/app/doctor" },
    { label: "Jadval", href: "/app/doctor/schedule" },
    { label: "Shablon", href: "/app/doctor/templates" },
    { label: "Tarix", href: "/app/doctor/clinical-history" },
  ];

  return (
    <nav className="hidden items-center gap-1 xl:flex">
      {items.map((item) => {
        const active = pathname === item.href || (item.href !== "/app/doctor" && pathname.startsWith(`${item.href}/`));
        return (
          <Link
            className={[
              "h-8 rounded-md px-2.5 py-2 text-xs font-semibold leading-none",
              active ? "bg-teal-50 text-teal-800" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950",
            ].join(" ")}
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function ReceptionTopbarNav({ pathname }: { pathname: string }) {
  const items = [
    { label: "Yangi qabul", href: "/app/reception/intake/new", primary: true },
    { label: "Umumiy", href: "/app/reception" },
    { label: "Bemor qidirish", href: "/app/reception/patient-search" },
    { label: "Check-in", href: "/app/reception/check-in" },
    { label: "Navbat", href: "/app/reception/queue" },
    { label: "Hujjatlar", href: "/app/reception/documents" },
    { label: "Smena", href: "/app/reception/shift" },
  ];

  return (
    <nav className="hidden items-center gap-1 xl:flex">
      {items.map((item) => {
        const active = pathname === item.href || (item.href !== "/app/reception" && pathname.startsWith(`${item.href}/`));
        return (
          <Link
            className={[
              "h-8 rounded-md px-2.5 py-2 text-xs font-semibold leading-none",
              item.primary
                ? "border border-teal-700 bg-teal-700 text-white hover:bg-teal-800"
                : active
                  ? "bg-teal-50 text-teal-800"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-950",
            ].join(" ")}
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
