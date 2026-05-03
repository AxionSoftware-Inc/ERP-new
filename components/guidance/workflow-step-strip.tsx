import Link from "next/link";

export type WorkflowStep = {
  key: string;
  label: string;
  description?: string;
  count?: number;
  href?: string;
  state?: "idle" | "active" | "warning" | "done";
};

export type WorkflowStepStripProps = {
  steps: WorkflowStep[];
};

const stateClass: Record<NonNullable<WorkflowStep["state"]>, string> = {
  idle: "border-slate-200 bg-white text-slate-700",
  active: "border-teal-200 bg-teal-50 text-teal-900",
  warning: "border-amber-200 bg-amber-50 text-amber-900",
  done: "border-emerald-200 bg-emerald-50 text-emerald-800",
};

export function WorkflowStepStrip({ steps }: WorkflowStepStripProps) {
  return (
    <div className="flex flex-wrap gap-1.5 rounded-md border border-slate-200 bg-white p-1.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      {steps.map((step, index) => {
        const className = [
          "group min-w-[150px] flex-1 rounded-md border px-3 py-2 text-left transition-colors",
          stateClass[step.state ?? "idle"],
          step.href ? "hover:border-slate-300 hover:bg-slate-50" : "",
        ].join(" ");
        const content = (
          <>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-normal opacity-60">Step {index + 1}</span>
              {typeof step.count === "number" ? (
                <span className="rounded-full border border-white/70 bg-white/80 px-2 py-0.5 text-xs font-bold">{step.count}</span>
              ) : null}
            </div>
            <div className="mt-1 truncate text-sm font-semibold">{step.label}</div>
            {step.description ? <div className="mt-0.5 truncate text-xs opacity-70">{step.description}</div> : null}
          </>
        );

        if (step.href) {
          return (
            <Link className={className} href={step.href} key={step.key}>
              {content}
            </Link>
          );
        }

        return (
          <div className={className} key={step.key}>
            {content}
          </div>
        );
      })}
    </div>
  );
}
