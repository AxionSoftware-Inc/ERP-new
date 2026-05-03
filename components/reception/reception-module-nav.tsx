"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type ReceptionModuleNavItem = {
  label: string;
  href: string;
};

export const receptionModuleNavItems: ReceptionModuleNavItem[] = [
  { label: "Umumiy", href: "/app/reception" },
  { label: "Yangi qabul", href: "/app/reception/intake/new" },
  { label: "Bemor qidirish", href: "/app/reception/patient-search" },
  { label: "Check-in", href: "/app/reception/check-in" },
  { label: "Navbatsizlar", href: "/app/reception/walk-ins" },
  { label: "Navbat", href: "/app/reception/queue" },
  { label: "Kechikkanlar", href: "/app/reception/delayed" },
  { label: "Hujjatlar", href: "/app/reception/documents" },
  { label: "Smena", href: "/app/reception/shift" },
];

export function ReceptionModuleNav() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="flex flex-wrap gap-1">
        {receptionModuleNavItems.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/app/reception" && pathname.startsWith(`${item.href}/`));

          return (
            <Link
              className={[
                "border-b-2 px-2.5 py-2 text-xs font-semibold transition-colors",
                active
                  ? "border-teal-600 text-teal-800"
                  : "border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-950",
              ].join(" ")}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
