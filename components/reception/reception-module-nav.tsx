"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type ReceptionModuleNavItem = {
  label: string;
  href: string;
  description: string;
};

export const receptionModuleNavItems: ReceptionModuleNavItem[] = [
  { label: "Umumiy", href: "/app/reception", description: "Qabulxona ish stoli" },
  { label: "Yangi qabul", href: "/app/reception/intake/new", description: "Tashrif yaratish" },
  { label: "Bemor qidirish", href: "/app/reception/patient-search", description: "Tez qidiruv" },
  { label: "Check-in", href: "/app/reception/check-in", description: "Kelgan bemorlar" },
  { label: "Navbatsizlar", href: "/app/reception/walk-ins", description: "Rejasiz kelganlar" },
  { label: "Navbat", href: "/app/reception/queue", description: "Boshqaruv" },
  { label: "Kechikkanlar", href: "/app/reception/delayed", description: "Nazorat" },
  { label: "Hujjatlar", href: "/app/reception/documents", description: "Qabul hujjatlari" },
  { label: "Smena", href: "/app/reception/shift", description: "Kun yakuni" },
];

export function ReceptionModuleNav() {
  const pathname = usePathname();

  return (
    <nav className="rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_1px_2px_rgba(15,23,42,0.05)]">
      <div className="flex flex-wrap gap-1.5">
        {receptionModuleNavItems.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/app/reception" && pathname.startsWith(`${item.href}/`));

          return (
            <Link
              className={[
                "group rounded-xl border px-3 py-2 transition-colors",
                active
                  ? "border-teal-300 bg-teal-50 text-teal-950 shadow-[0_1px_2px_rgba(15,118,110,0.12)]"
                  : "border-transparent bg-white text-slate-600 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-950",
              ].join(" ")}
              href={item.href}
              key={item.href}
            >
              <span className="block text-sm font-semibold leading-4">{item.label}</span>
              <span
                className={[
                  "mt-0.5 block text-[10.5px] font-medium leading-3",
                  active ? "text-teal-700" : "text-slate-400 group-hover:text-slate-500",
                ].join(" ")}
              >
                {item.description}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
