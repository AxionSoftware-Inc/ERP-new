"use client";

export type IntakeStep = {
  id: number;
  label: string;
  description: string;
};

export type IntakeStepperProps = {
  steps: IntakeStep[];
  currentStep: number;
  onStepSelect: (step: number) => void;
};

export function IntakeStepper({ steps, currentStep, onStepSelect }: IntakeStepperProps) {
  return (
    <nav className="grid gap-2 md:grid-cols-4">
      {steps.map((step) => {
        const isActive = step.id === currentStep;
        const isComplete = step.id < currentStep;
        return (
          <button
            className={[
              "rounded-xl border px-3 py-2 text-left transition-colors",
              isActive
                ? "border-teal-300 bg-teal-50 text-teal-950 shadow-[0_1px_2px_rgba(15,118,110,0.12)]"
                : isComplete
                  ? "border-emerald-200 bg-emerald-50/70 text-emerald-950"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
            ].join(" ")}
            key={step.id}
            onClick={() => onStepSelect(step.id)}
            type="button"
          >
            <div className="flex items-center gap-2">
              <span
                className={[
                  "inline-flex h-5 w-5 items-center justify-center rounded-full border text-[11px] font-bold",
                  isActive
                    ? "border-teal-400 bg-teal-700 text-white"
                    : isComplete
                      ? "border-emerald-300 bg-emerald-600 text-white"
                      : "border-slate-300 bg-white text-slate-600",
                ].join(" ")}
              >
                {step.id}
              </span>
              <span className="text-sm font-semibold">{step.label}</span>
            </div>
            <p className="mt-1 line-clamp-1 text-xs opacity-75">{step.description}</p>
          </button>
        );
      })}
    </nav>
  );
}
