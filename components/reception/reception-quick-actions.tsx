import Link from "next/link";

const actions = [
  { label: "Yangi qabul", href: "/app/reception/intake/new" },
  { label: "Bemor qidirish", href: "/app/reception/patient-search" },
  { label: "Check-in", href: "/app/reception/check-in" },
  { label: "Navbatsizlar", href: "/app/reception/walk-ins" },
  { label: "Navbat nazorati", href: "/app/reception/queue" },
];

export function ReceptionQuickActions() {
  return (
    <section className="rounded-md border border-slate-200 bg-white p-3">
      <h2 className="text-sm font-semibold text-slate-950">Tez amallar</h2>
      <div className="mt-2 grid gap-1.5">
        {actions.map((action) => (
          <Link className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 hover:border-teal-200 hover:bg-teal-50 hover:text-teal-800" href={action.href} key={action.href}>
            {action.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
