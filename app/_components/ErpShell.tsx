"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const roleTabs = [
  { label: "Dashboard", href: "/dashboard", match: "/dashboard" },
  { label: "Reception", href: "/reception", match: "/reception" },
  { label: "Appointments", href: "/appointments", match: "/appointments" },
  { label: "Patients", href: "/patients", match: "/patients" },
  { label: "Visits", href: "/visits", match: "/visits" },
  { label: "Doctor", href: "/doctor", match: "/doctor" },
  { label: "Nursing", href: "/nursing", match: "/nursing" },
  { label: "Lab", href: "/laboratory", match: "/laboratory" },
  { label: "Radiology", href: "/radiology", match: "/radiology" },
  { label: "Procedures", href: "/treatment", match: "/treatment" },
  { label: "Documents", href: "/medical-documents", match: "/medical-documents" },
  { label: "Cashier", href: "/cashier", match: "/cashier" },
  { label: "Insurance", href: "/insurance", match: "/insurance" },
  { label: "Pharmacy", href: "/pharmacy", match: "/pharmacy" },
  { label: "Inventory", href: "/inventory", match: "/inventory" },
  { label: "Procurement", href: "/procurement", match: "/procurement" },
  { label: "HR", href: "/hr", match: "/hr" },
  { label: "Finance", href: "/finance", match: "/finance" },
  { label: "Assets", href: "/assets", match: "/assets" },
  { label: "Reports", href: "/reports", match: "/reports" },
  { label: "Analytics", href: "/analytics", match: "/analytics" },
  { label: "Quality", href: "/quality", match: "/quality" },
  { label: "Admin", href: "/admin", match: "/admin" },
  { label: "Tasks", href: "/tasks", match: "/tasks" },
  { label: "Audit", href: "/audit", match: "/audit" },
  { label: "Search", href: "/search", match: "/search" },
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
