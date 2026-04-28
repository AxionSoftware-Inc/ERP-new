"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Overview", href: "/reports" },
  { label: "Tushum", href: "/reports/revenue" },
  { label: "Xizmatlar", href: "/reports/services" },
  { label: "Shifokorlar", href: "/reports/doctors" },
  { label: "Qarzdorlik", href: "/reports/debts" },
];

export function ReportsSubnav() {
  const pathname = usePathname();

  return (
    <nav className="module-subnav" aria-label="Reports navigatsiyasi">
      {links.map((link) => (
        <Link className={pathname === link.href ? "active" : ""} href={link.href} key={link.href}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
