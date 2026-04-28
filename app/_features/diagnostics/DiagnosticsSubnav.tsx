"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Ish stoli", href: "/diagnostics" },
  { label: "Jadval", href: "/diagnostics/schedule" },
  { label: "Buyurtmalar", href: "/diagnostics/orders" },
  { label: "Natijalar", href: "/diagnostics/results" },
];

export function DiagnosticsSubnav() {
  const pathname = usePathname();
  return (
    <nav className="module-subnav" aria-label="Diagnostics navigatsiyasi">
      {links.map((link) => (
        <Link className={pathname === link.href ? "active" : ""} href={link.href} key={link.href}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
