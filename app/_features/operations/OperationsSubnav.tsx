"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Ombor", href: "/inventory" },
  { label: "Mahsulotlar", href: "/inventory/items" },
  { label: "Kirim", href: "/inventory/stock-in" },
  { label: "Chiqim", href: "/inventory/stock-out" },
  { label: "Xarid so'rovlari", href: "/purchases/requests" },
  { label: "Buyurtmalar", href: "/purchases/orders" },
  { label: "Yetkazib beruvchilar", href: "/purchases/suppliers" },
];

export function OperationsSubnav() {
  const pathname = usePathname();

  return (
    <nav className="module-subnav" aria-label="Operations navigatsiyasi">
      {links.map((link) => (
        <Link className={pathname === link.href ? "active" : ""} href={link.href} key={link.href}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
