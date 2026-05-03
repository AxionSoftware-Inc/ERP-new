"use client";

import type {
  ReceptionIntakeDraft,
  ReceptionPaymentType,
  ReceptionServiceOption,
} from "@/lib/types/reception";

export type IntakeServiceStepProps = {
  draft: ReceptionIntakeDraft;
  serviceOptions: ReceptionServiceOption[];
  selectedServices: ReceptionServiceOption[];
  estimatedTotal: string;
  onToggleService: (serviceId: string) => void;
  onPaymentTypeChange: (paymentType: ReceptionPaymentType) => void;
};

const paymentTypes: { value: ReceptionPaymentType; label: string }[] = [
  { value: "cash", label: "Naqd" },
  { value: "card", label: "Karta" },
  { value: "insurance", label: "Sug‘urta" },
  { value: "corporate", label: "Korporativ" },
  { value: "mixed", label: "Aralash" },
];

export function IntakeServiceStep({
  draft,
  serviceOptions,
  selectedServices,
  estimatedTotal,
  onToggleService,
  onPaymentTypeChange,
}: IntakeServiceStepProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.05)]">
      <div className="border-b border-slate-200 bg-slate-50 px-3 py-2">
        <h2 className="text-sm font-semibold text-slate-950">Xizmatlar / to‘lov</h2>
        <p className="mt-0.5 text-xs text-slate-500">
          To‘lovga tushadigan xizmatlarni tanlang va to‘lov turini belgilang.
        </p>
      </div>

      <div className="grid gap-3 p-3 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="grid gap-2 md:grid-cols-2">
          {serviceOptions.map((service) => {
            const selected = draft.serviceIds.includes(service.id);
            return (
              <button
                className={[
                  "rounded-xl border p-3 text-left transition-colors",
                  selected
                    ? "border-teal-300 bg-teal-50 text-teal-950 ring-1 ring-teal-100"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
                  service.isActive ? "" : "cursor-not-allowed opacity-55",
                ].join(" ")}
                disabled={!service.isActive}
                key={service.id}
                onClick={() => onToggleService(service.id)}
                type="button"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{service.serviceName}</div>
                    <div className="mt-0.5 truncate text-xs opacity-70">
                      {service.serviceCode} / {service.department.name}
                    </div>
                  </div>
                  <span
                    className={[
                      "mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px]",
                      selected ? "border-teal-600 bg-teal-700 text-white" : "border-slate-300 bg-white",
                    ].join(" ")}
                  >
                    {selected ? "x" : ""}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-semibold text-slate-950">{service.price.formatted}</span>
                  {service.estimatedDurationMinutes ? (
                    <span className="rounded-full border border-slate-200 bg-white px-2 py-0.5 text-slate-600">
                      {service.estimatedDurationMinutes} min
                    </span>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>

        <aside className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Tanlangan xizmatlar
          </h3>
          <div className="mt-3 space-y-2">
            {selectedServices.length ? (
              selectedServices.map((service) => (
                <div
                  className="flex items-start justify-between gap-2 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs"
                  key={service.id}
                >
                  <span className="min-w-0 truncate font-medium text-slate-700">
                    {service.serviceName}
                  </span>
                  <span className="shrink-0 font-semibold text-slate-950">
                    {service.price.formatted}
                  </span>
                </div>
              ))
            ) : (
              <p className="rounded-lg border border-dashed border-slate-200 bg-white px-2 py-3 text-xs text-slate-500">
                Tashrif yaratishdan oldin kamida bitta xizmat tanlang.
              </p>
            )}
          </div>

          <div className="mt-3 rounded-lg border border-teal-100 bg-teal-50 px-3 py-2">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-teal-700">
              Taxminiy jami
            </div>
            <div className="mt-0.5 text-lg font-bold text-teal-950">{estimatedTotal}</div>
          </div>

          <div className="mt-3">
            <div className="mb-1.5 text-xs font-semibold text-slate-600">To‘lov turi</div>
            <div className="grid grid-cols-2 gap-1.5">
              {paymentTypes.map((paymentType) => (
                <button
                  className={[
                    "rounded-lg border px-2 py-1.5 text-xs font-semibold transition-colors",
                    draft.paymentType === paymentType.value
                      ? "border-teal-300 bg-teal-50 text-teal-950"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900",
                  ].join(" ")}
                  key={paymentType.value}
                  onClick={() => onPaymentTypeChange(paymentType.value)}
                  type="button"
                >
                  {paymentType.label}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
