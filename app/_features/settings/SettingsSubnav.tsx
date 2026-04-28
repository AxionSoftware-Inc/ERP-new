"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Overview", href: "/settings" },
  { label: "Klinika", href: "/settings/clinic" },
  { label: "Ish vaqti", href: "/settings/working-hours" },
  { label: "To'lov usullari", href: "/settings/payment-methods" },
  { label: "Qabul qoidalari", href: "/settings/appointment-rules" },
];

export function SettingsSubnav() {
  const pathname = usePathname();

  return (
    <nav className="module-subnav" aria-label="Settings navigatsiyasi">
      {links.map((link) => (
        <Link className={pathname === link.href ? "active" : ""} href={link.href} key={link.href}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
