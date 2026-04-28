"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Ish stoli", href: "/doctor" },
  { label: "Jadval", href: "/doctor/schedule" },
  { label: "Statistika", href: "/doctor/statistics" },
];

export function DoctorSubnav() {
  const pathname = usePathname();

  return (
    <nav className="module-subnav" aria-label="Doctor navigatsiyasi">
      {links.map((link) => (
        <Link className={pathname === link.href ? "active" : ""} href={link.href} key={link.href}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
