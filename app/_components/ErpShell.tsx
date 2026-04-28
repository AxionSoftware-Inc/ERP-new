"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const roleTabs = [
  { label: "Reception", href: "/reception", match: "/reception" },
  { label: "Doctor", href: "/doctor", match: "/doctor" },
  { label: "Lab", href: "/laboratory", match: "/laboratory" },
  { label: "Diagnostics", href: "/diagnostics", match: "/diagnostics" },
  { label: "Cashier", href: "/cashier", match: "/cashier" },
  { label: "Patients", href: "/patients", match: "/patients" },
  { label: "Services", href: "/services", match: "/services" },
  { label: "Documents", href: "/documents", match: "/documents" },
  { label: "Reports", href: "/reports", match: "/reports" },
  { label: "Inventory", href: "/inventory", match: "/inventory" },
  { label: "Purchases", href: "/purchases/requests", match: "/purchases" },
  { label: "Access", href: "/access/users", match: "/access" },
  { label: "Audit", href: "/audit", match: "/audit" },
  { label: "Settings", href: "/settings", match: "/settings" },
];

export function ErpShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="erp-shell">
      <header className="role-topbar">
        <div className="role-brand">
          <span className="brand-mark">K</span>
          <div>
            <strong>Klinika ERP</strong>
            <small>Role switcher</small>
          </div>
        </div>

        <nav className="role-tabs" aria-label="Rolelar bo'yicha o'tish">
          {roleTabs.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.match}/`);

            return (
              <Link className={active ? "active" : ""} href={item.href} key={item.href}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="role-actions">
          <span>Asosiy filial</span>
          <strong>Admin</strong>
        </div>
      </header>

      <main className="content">{children}</main>
    </div>
  );
}
