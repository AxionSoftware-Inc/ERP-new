"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const doctorNavItems = [
  { label: "Overview", href: "/app/doctor" },
  { label: "My queue", href: "/app/doctor/queue" },
  { label: "Active", href: "/app/doctor/active" },
  { label: "Reviews", href: "/app/doctor/reviews" },
  { label: "Completed", href: "/app/doctor/completed" },
  { label: "Schedule", href: "/app/doctor/schedule" },
  { label: "Templates", href: "/app/doctor/templates" },
  { label: "Clinical history", href: "/app/doctor/clinical-history" },
];

export function DoctorModuleNav() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="flex flex-wrap gap-1">
        {doctorNavItems.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/app/doctor" && pathname.startsWith(`${item.href}/`));

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
