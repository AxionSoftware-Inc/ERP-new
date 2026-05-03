import Link from "next/link";

export type ModuleQuickAction = {
  label: string;
  description?: string;
  href: string;
  count?: number;
  tone?: "neutral" | "info" | "warning" | "success" | "danger" | "accent";
};

export type ModuleQuickActionsProps = {
  title?: string;
  actions: ModuleQuickAction[];
};

const toneClass: Record<NonNullable<ModuleQuickAction["tone"]>, string> = {
  neutral: "border-slate-200 bg-white text-slate-700",
  info: "border-blue-200 bg-blue-50 text-blue-800",
  warning: "border-amber-200 bg-amber-50 text-amber-900",
  success: "border-emerald-200 bg-emerald-50 text-emerald-800",
  danger: "border-red-200 bg-red-50 text-red-800",
  accent: "border-teal-200 bg-teal-50 text-teal-800",
};

export function ModuleQuickActions({ title = "Quick actions", actions }: ModuleQuickActionsProps) {
  return (
    <section className="rounded-md border border-slate-200 bg-white p-3 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <h2 className="text-sm font-semibold text-slate-950">{title}</h2>
      <div className="mt-2 grid gap-1.5 sm:grid-cols-2 xl:grid-cols-5">
        {actions.map((action) => (
          <Link
            className={["min-w-0 rounded-md border px-3 py-2 transition-colors hover:border-slate-300 hover:bg-slate-50", toneClass[action.tone ?? "neutral"]].join(" ")}
            href={action.href}
            key={action.href}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-sm font-semibold">{action.label}</span>
              {typeof action.count === "number" ? (
                <span className="rounded-full border border-white/80 bg-white/80 px-2 py-0.5 text-xs font-bold">{action.count}</span>
              ) : null}
            </div>
            {action.description ? <p className="mt-0.5 truncate text-xs opacity-70">{action.description}</p> : null}
          </Link>
        ))}
      </div>
    </section>
  );
}
