"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const doctorNavItems = [
  { label: "Ish stoli", href: "/app/doctor", description: "Kunlik qabul" },
  { label: "Navbat", href: "/app/doctor/queue", description: "Kutayotganlar" },
  { label: "Faol qabul", href: "/app/doctor/active", description: "Jarayondagilar" },
  { label: "Review", href: "/app/doctor/reviews", description: "Natija ko‘rish" },
  { label: "Yakunlangan", href: "/app/doctor/completed", description: "Bugungi tugaganlar" },
];

export function DoctorModuleNav() {
  const pathname = usePathname();

  return (
    <nav className="rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_1px_2px_rgba(15,23,42,0.05)]">
      <div className="flex flex-wrap gap-1.5">
        {doctorNavItems.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/app/doctor" && pathname.startsWith(`${item.href}/`));

          return (
            <Link
              className={[
                "group rounded-xl border px-3 py-2 transition-colors",
                active
                  ? "border-indigo-300 bg-indigo-50 text-indigo-950 shadow-[0_1px_2px_rgba(79,70,229,0.12)]"
                  : "border-transparent bg-white text-slate-600 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-950",
              ].join(" ")}
              href={item.href}
              key={item.href}
            >
              <span className="block text-sm font-semibold leading-4">{item.label}</span>
              <span className={["mt-0.5 block text-[10.5px] font-medium leading-3", active ? "text-indigo-700" : "text-slate-400 group-hover:text-slate-500"].join(" ")}>
                {item.description}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
