export type AppNavGroup = "Clinical" | "Business" | "Management" | "System";

export type AppNavItem = {
  label: string;
  href: string;
  group: AppNavGroup;
  iconKey?: string;
  roles?: string[];
};

export const appNavGroups: AppNavGroup[] = ["Clinical", "Business", "Management", "System"];

export const appNavItems: AppNavItem[] = [
  { label: "Reception", href: "/app/reception", group: "Clinical", iconKey: "reception", roles: ["receptionist", "admin"] },
  { label: "Appointments", href: "/app/appointments", group: "Clinical", iconKey: "calendar", roles: ["receptionist", "admin"] },
  { label: "Patients", href: "/app/patients", group: "Clinical", iconKey: "patients", roles: ["receptionist", "doctor", "admin"] },
  { label: "Visits", href: "/app/visits", group: "Clinical", iconKey: "visits", roles: ["receptionist", "doctor", "admin"] },
  { label: "Doctor", href: "/app/doctor", group: "Clinical", iconKey: "doctor", roles: ["doctor", "admin"] },
  { label: "Nursing", href: "/app/nursing", group: "Clinical", iconKey: "nursing", roles: ["nurse", "admin"] },
  { label: "Lab", href: "/app/lab", group: "Clinical", iconKey: "lab", roles: ["lab_operator", "lab_verifier", "admin"] },
  { label: "Radiology", href: "/app/radiology", group: "Clinical", iconKey: "radiology", roles: ["radiology_operator", "radiologist", "admin"] },
  { label: "Procedures", href: "/app/procedures", group: "Clinical", iconKey: "procedures", roles: ["nurse", "operations_manager", "admin"] },

  { label: "Cashier", href: "/app/cashier", group: "Business", iconKey: "cashier", roles: ["cashier", "admin"] },
  { label: "Pharmacy", href: "/app/pharmacy", group: "Business", iconKey: "pharmacy", roles: ["pharmacist", "admin"] },
  { label: "Inventory", href: "/app/inventory", group: "Business", iconKey: "inventory", roles: ["inventory_manager", "admin"] },
  { label: "Procurement", href: "/app/procurement", group: "Business", iconKey: "procurement", roles: ["inventory_manager", "operations_manager", "admin"] },
  { label: "HR", href: "/app/hr", group: "Business", iconKey: "hr", roles: ["hr_manager", "admin"] },
  { label: "Finance", href: "/app/finance", group: "Business", iconKey: "finance", roles: ["finance_manager", "admin"] },

  { label: "Dashboard", href: "/app/dashboard", group: "Management", iconKey: "dashboard", roles: ["director", "operations_manager", "admin"] },
  { label: "Reports", href: "/app/reports", group: "Management", iconKey: "reports", roles: ["director", "finance_manager", "admin"] },
  { label: "Analytics", href: "/app/analytics", group: "Management", iconKey: "analytics", roles: ["director", "operations_manager", "admin"] },
  { label: "Quality", href: "/app/quality", group: "Management", iconKey: "quality", roles: ["operations_manager", "admin"] },

  { label: "Admin", href: "/app/admin", group: "System", iconKey: "admin", roles: ["admin"] },
  { label: "Audit", href: "/app/audit", group: "System", iconKey: "audit", roles: ["admin", "director"] },
];

export function getNavItemForPath(pathname: string): AppNavItem | undefined {
  return appNavItems
    .slice()
    .sort((left, right) => right.href.length - left.href.length)
    .find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`));
}
