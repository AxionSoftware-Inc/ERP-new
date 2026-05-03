"use client";

import type { ReactNode } from "react";
import type {
  ReceptionDoctorAvailability,
  ReceptionIntakeDraft,
  ReceptionIntakePreviewResponse,
  ReceptionPatientSearchResult,
  ReceptionServiceOption,
} from "@/lib/types/reception";
import type { IntakeQueueOption } from "@/components/reception/intake-routing-step";

export type IntakePreviewRailProps = {
  draft: ReceptionIntakeDraft;
  queueOption: IntakeQueueOption;
  selectedPatient?: ReceptionPatientSearchResult | null;
  selectedServices: ReceptionServiceOption[];
  selectedDoctor?: ReceptionDoctorAvailability | null;
  estimatedTotal: string;
  missingFields: string[];
  contextWarnings: string[];
  preview?: ReceptionIntakePreviewResponse | null;
  recommendation: string;
};

export function IntakePreviewRail({
  draft,
  queueOption,
  selectedPatient,
  selectedServices,
  selectedDoctor,
  estimatedTotal,
  missingFields,
  contextWarnings,
  preview,
  recommendation,
}: IntakePreviewRailProps) {
  const newPatientName = draft.newPatient?.fullName.trim();
  const warnings = [
    ...contextWarnings,
    selectedPatient?.activeVisit ? `Faol tashrif: ${selectedPatient.activeVisit.visitCode}` : null,
    selectedPatient?.balance && selectedPatient.balance.amount > 0
      ? `Balans: ${selectedPatient.balance.formatted}`
      : null,
    selectedPatient?.duplicateReason ?? null,
    ...(preview?.warnings ?? []),
  ]
    .filter((warning): warning is string => Boolean(warning))
    .map(localizeWarning);

  return (
    <aside className="space-y-3">
      <section className="rounded-xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.05)]">
        <div className="border-b border-slate-200 bg-slate-50 px-3 py-2">
          <h2 className="text-sm font-semibold text-slate-950">Qabul preview</h2>
          <p className="mt-0.5 text-xs text-slate-500">Qabulxonadagi tayyorgarlik holati.</p>
        </div>

        <div className="space-y-3 p-3">
          <PreviewSection title="Bemor">
            {selectedPatient ? (
              <PreviewLine
                label={selectedPatient.patient.patientCode}
                value={selectedPatient.patient.fullName}
              />
            ) : newPatientName ? (
              <PreviewLine label="Yangi bemor" value={newPatientName} />
            ) : (
              <EmptyLine text="Hali bemor tanlanmagan." />
            )}
          </PreviewSection>

          <PreviewSection title="Tashrif">
            <PreviewLine label="Turi" value={formatValue(draft.visitType)} />
            <PreviewLine label="Ustuvorlik" value={formatValue(draft.priority)} />
            <PreviewLine label="Manba" value={formatValue(draft.source)} />
            <PreviewLine label="Sabab" value={draft.reason.trim() || "Kiritilmagan"} warning={!draft.reason.trim()} />
          </PreviewSection>

          <PreviewSection title="Xizmatlar / to‘lov">
            {selectedServices.length ? (
              selectedServices.map((service) => (
                <PreviewLine
                  key={service.id}
                  label={service.department.code}
                  value={`${service.serviceName} / ${service.price.formatted}`}
                />
              ))
            ) : (
              <EmptyLine text="Xizmat tanlanmagan." warning />
            )}
            <div className="rounded-lg border border-teal-100 bg-teal-50 px-2 py-1.5">
              <div className="text-[10px] font-semibold uppercase tracking-wide text-teal-700">
                Taxminiy jami
              </div>
              <div className="text-sm font-bold text-teal-950">
                {preview?.estimatedTotal.formatted ?? estimatedTotal}
              </div>
            </div>
            <PreviewLine label="To‘lov" value={formatValue(draft.paymentType)} />
          </PreviewSection>

          <PreviewSection title="Yo‘naltirish">
            {selectedDoctor ? (
              <>
                <PreviewLine label="Shifokor" value={selectedDoctor.doctor.fullName} />
                <PreviewLine label="Bo‘lim" value={selectedDoctor.department.name} />
                <PreviewLine label="Kutish" value={`${selectedDoctor.estimatedWaitMinutes} daq`} />
              </>
            ) : (
              <EmptyLine text="Shifokor tanlanmagan." warning={queueOption !== "create_only"} />
            )}
            <PreviewLine label="Navbat varianti" value={formatValue(queueOption)} />
          </PreviewSection>

          <PreviewSection title="Yakuniy harakat tayyorligi">
            {missingFields.length ? (
              <div className="space-y-1">
                {missingFields.map((field) => (
                  <div
                    className="rounded-lg border border-red-200 bg-red-50 px-2 py-1.5 text-xs font-medium text-red-800"
                    key={field}
                  >
                    Yetishmaydi: {field}
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-1.5 text-xs font-semibold text-emerald-800">
                Mock yaratish uchun tayyor.
              </div>
            )}
            <div className="rounded-lg border border-slate-200 bg-white px-2 py-1.5">
              <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                Tavsiya
              </div>
              <div className="mt-0.5 text-sm font-semibold text-slate-950">{recommendation}</div>
            </div>
          </PreviewSection>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-[0_1px_2px_rgba(15,23,42,0.05)]">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Ogohlantirishlar</h3>
        <div className="mt-2 space-y-1.5">
          {warnings.length ? (
            warnings.map((warning) => (
              <div
                className="rounded-lg border border-amber-200 bg-amber-50 px-2 py-1.5 text-xs font-medium text-amber-900"
                key={warning}
              >
                {warning}
              </div>
            ))
          ) : (
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs text-slate-500">
              Faol ogohlantirish yo‘q.
            </div>
          )}
        </div>
      </section>
    </aside>
  );
}

function PreviewSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-1.5">
      <h3 className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{title}</h3>
      <div className="space-y-1.5">{children}</div>
    </section>
  );
}

function PreviewLine({ label, value, warning }: { label: string; value: string; warning?: boolean }) {
  return (
    <div
      className={[
        "flex items-center justify-between gap-2 rounded-lg border px-2 py-1.5 text-xs",
        warning ? "border-amber-200 bg-amber-50 text-amber-900" : "border-slate-200 bg-slate-50 text-slate-700",
      ].join(" ")}
    >
      <span className="shrink-0 font-medium opacity-70">{label}</span>
      <span className="min-w-0 truncate text-right font-semibold">{value}</span>
    </div>
  );
}

function EmptyLine({ text, warning }: { text: string; warning?: boolean }) {
  return (
    <div
      className={[
        "rounded-lg border px-2 py-1.5 text-xs",
        warning ? "border-amber-200 bg-amber-50 text-amber-900" : "border-dashed border-slate-200 bg-slate-50 text-slate-500",
      ].join(" ")}
    >
      {text}
    </div>
  );
}

function formatValue(value: string): string {
  const labels: Record<string, string> = {
    walk_in: "Navbatsiz",
    appointment: "Rejali qabul",
    follow_up: "Takroriy",
    emergency: "Shoshilinch",
    normal: "Oddiy",
    urgent: "Tezkor",
    vip: "VIP",
    phone: "Telefon",
    telegram: "Telegram",
    referral: "Yo‘llanma",
    corporate: "Korporativ",
    insurance: "Sug‘urta",
    doctor_referral: "Shifokor yo‘llanmasi",
    cash: "Naqd",
    card: "Karta",
    mixed: "Aralash",
    assign_only: "Faqat biriktirish",
    assign_and_queue: "Biriktirib navbatga qo‘yish",
    create_only: "Faqat yaratish",
  };

  return labels[value] ?? value.replaceAll("_", " ");
}

function localizeWarning(value: string): string {
  if (value === "No billable services selected.") return "To‘lovga tushadigan xizmat tanlanmagan.";
  if (value === "Emergency priority requires immediate clinical handoff.") {
    return "Shoshilinch ustuvorlik darhol klinik topshirishni talab qiladi.";
  }
  if (value.includes("patients waiting")) {
    return value.replace("has", "navbatida").replace("patients waiting.", "ta bemor kutmoqda.");
  }
  if (value.includes("is not available for routing.")) {
    return value.replace("is not available for routing.", "yo‘naltirish uchun mavjud emas.");
  }
  return value;
}
