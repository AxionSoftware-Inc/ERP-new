"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Ish stoli", href: "/cashier" },
  { label: "Yangi to'lov", href: "/cashier/payments/new" },
  { label: "To'lovlar", href: "/cashier/payments" },
  { label: "Qarzdorlik", href: "/cashier/debts" },
  { label: "Kassa yopish", href: "/cashier/closing" },
];

export function CashierSubnav() {
  const pathname = usePathname();
  return (
    <nav className="module-subnav" aria-label="Cashier navigatsiyasi">
      {links.map((link) => (
        <Link className={pathname === link.href ? "active" : ""} href={link.href} key={link.href}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
