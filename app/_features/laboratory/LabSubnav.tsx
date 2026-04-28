"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Ish stoli", href: "/laboratory" },
  { label: "Buyurtmalar", href: "/laboratory/orders" },
  { label: "Tasdiqlash", href: "/laboratory/results/approval" },
  { label: "Natijalar", href: "/laboratory/results" },
  { label: "Yuklama", href: "/laboratory/workload" },
];

export function LabSubnav() {
  const pathname = usePathname();

  return (
    <nav className="module-subnav" aria-label="Laboratory navigatsiyasi">
      {links.map((link) => (
        <Link className={pathname === link.href ? "active" : ""} href={link.href} key={link.href}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
