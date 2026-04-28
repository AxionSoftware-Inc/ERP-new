"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const receptionLinks = [
  { label: "Ish stoli", href: "/reception" },
  { label: "Qabul jadvali", href: "/reception/schedule" },
  { label: "Qabullar", href: "/reception/appointments" },
  { label: "Yangi qabul", href: "/reception/appointments/new" },
  { label: "Qo'ng'iroqlar", href: "/reception/calls" },
  { label: "Kelmaganlar", href: "/reception/no-shows" },
];

export function ReceptionSubnav() {
  const pathname = usePathname();

  return (
    <nav className="module-subnav" aria-label="Reception navigatsiyasi">
      {receptionLinks.map((link) => {
        const active = pathname === link.href || (link.href !== "/reception" && pathname.startsWith(`${link.href}/`));

        return (
          <Link className={active ? "active" : ""} href={link.href} key={link.href}>
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
