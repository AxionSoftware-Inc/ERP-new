"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  createReceptionIntakeDraft,
  previewReceptionIntake,
  searchReceptionPatients,
} from "@/lib/api/client";
import type {
  ReceptionDoctorAvailability,
  ReceptionIntakeContext,
  ReceptionIntakeDraft,
  ReceptionIntakeDraftResponse,
  ReceptionIntakePreviewResponse,
  ReceptionPatientSearchResult,
} from "@/lib/types/reception";
import { IntakePatientStep } from "@/components/reception/intake-patient-step";
import { IntakePreviewRail } from "@/components/reception/intake-preview-rail";
import {
  IntakeRoutingStep,
  type IntakeQueueOption,
} from "@/components/reception/intake-routing-step";
import { IntakeServiceStep } from "@/components/reception/intake-service-step";
import { IntakeStepper, type IntakeStep } from "@/components/reception/intake-stepper";
import { IntakeVisitStep } from "@/components/reception/intake-visit-step";

export type IntakeFlowProps = {
  context: ReceptionIntakeContext;
};

const intakeSteps: IntakeStep[] = [
  { id: 1, label: "Bemor", description: "Topish yoki ro‘yxatga olish" },
  { id: 2, label: "Tashrif", description: "Sabab va ustuvorlik" },
  { id: 3, label: "Xizmatlar", description: "To‘lov asosi" },
  { id: 4, label: "Yo‘naltirish", description: "Shifokor va navbat" },
];

export function IntakeFlow({ context }: IntakeFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [draft, setDraft] = useState<ReceptionIntakeDraft>(() => createInitialDraft(context));
  const [queueOption, setQueueOption] = useState<IntakeQueueOption>("assign_and_queue");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ReceptionPatientSearchResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<ReceptionPatientSearchResult | null>(null);
  const [preview, setPreview] = useState<ReceptionIntakePreviewResponse | null>(null);
  const [result, setResult] = useState<ReceptionIntakeDraftResponse | null>(null);
  const [isWorking, setIsWorking] = useState(false);
  const [attemptedCreate, setAttemptedCreate] = useState(false);

  useEffect(() => {
    let active = true;

    searchReceptionPatients(searchQuery).then((response) => {
      if (!active) return;
      setSearchResults(response.results);
    });

    return () => {
      active = false;
    };
  }, [searchQuery]);

  const selectedServices = useMemo(
    () => context.serviceOptions.filter((service) => draft.serviceIds.includes(service.id)),
    [context.serviceOptions, draft.serviceIds],
  );

  const selectedDoctor = useMemo(
    () =>
      context.doctorAvailability.find((availability) => availability.doctor.id === draft.doctorId) ??
      null,
    [context.doctorAvailability, draft.doctorId],
  );

  const estimatedTotal = useMemo(
    () => formatMoney(selectedServices.reduce((sum, service) => sum + service.price.amount, 0)),
    [selectedServices],
  );

  const missingFields = useMemo(
    () => getMissingFields(draft, queueOption),
    [draft, queueOption],
  );

  const recommendation = getRecommendation(queueOption);

  function updateDraft(patch: Partial<ReceptionIntakeDraft>) {
    setDraft((current) => ({ ...current, ...patch }));
    setResult(null);
  }

  function selectPatient(searchResult: ReceptionPatientSearchResult) {
    setSelectedResult(searchResult);
    updateDraft({
      patientId: searchResult.patient.id,
      newPatient: undefined,
    });
  }

  function updateNewPatient(newPatient: NonNullable<ReceptionIntakeDraft["newPatient"]>) {
    setSelectedResult(null);
    updateDraft({
      patientId: null,
      newPatient,
    });
  }

  function toggleService(serviceId: string) {
    setDraft((current) => {
      const selected = current.serviceIds.includes(serviceId);
      return {
        ...current,
        serviceIds: selected
          ? current.serviceIds.filter((id) => id !== serviceId)
          : [...current.serviceIds, serviceId],
      };
    });
    setResult(null);
  }

  function selectDoctor(availability: ReceptionDoctorAvailability) {
    updateDraft({
      doctorId: availability.doctor.id,
      departmentId: availability.department.id,
    });
  }

  async function handlePreview() {
    setIsWorking(true);
    try {
      setPreview(await previewReceptionIntake(draft));
    } finally {
      setIsWorking(false);
    }
  }

  async function handleCreate() {
    setAttemptedCreate(true);
    if (missingFields.length) return;

    setIsWorking(true);
    try {
      setResult(await createReceptionIntakeDraft(draft));
      setPreview(await previewReceptionIntake(draft));
    } finally {
      setIsWorking(false);
    }
  }

  function resetFlow() {
    setCurrentStep(1);
    setDraft(createInitialDraft(context));
    setQueueOption("assign_and_queue");
    setSearchQuery("");
    setSelectedResult(null);
    setPreview(null);
    setResult(null);
    setAttemptedCreate(false);
  }

  return (
    <div className="space-y-3 bg-slate-100/70 p-3">
      <header className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-[0_1px_2px_rgba(15,23,42,0.05)]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              className="text-xs font-semibold text-slate-500 hover:text-slate-900"
              href="/app/reception"
            >
              Qabulxonaga qaytish
            </Link>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-950">Yangi qabul</h1>
              <span className="rounded-full border border-teal-200 bg-teal-50 px-2 py-0.5 text-xs font-semibold text-teal-800">
                Mock rejim
              </span>
            </div>
            <p className="mt-1 max-w-3xl text-sm text-slate-500">
              Bemorni toping yoki ro‘yxatga oling, tashrif yarating va kerakli shifokorga yo‘naltiring.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs">
            <HeaderMetric label="Shifokorlar" value={String(context.doctorAvailability.length)} />
            <HeaderMetric label="Xizmatlar" value={String(context.serviceOptions.length)} />
            <HeaderMetric label="Bugun" value={String(context.todayAppointments.length)} />
          </div>
        </div>
      </header>

      {result ? <SuccessPanel message="Qabul qoralamasi mock rejimda qabul qilindi." onReset={resetFlow} /> : null}

      {attemptedCreate && missingFields.length ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-800">
          Mock qabul yaratishdan oldin majburiy maydonlarni to‘ldiring: {missingFields.join(", ")}.
        </div>
      ) : null}

      <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_360px]">
        <main className="min-w-0 space-y-3">
          <IntakeStepper
            currentStep={currentStep}
            onStepSelect={setCurrentStep}
            steps={intakeSteps}
          />

          {currentStep === 1 ? (
            <IntakePatientStep
              draft={draft}
              onNewPatientChange={updateNewPatient}
              onSearchChange={setSearchQuery}
              onSelectPatient={selectPatient}
              results={searchResults}
              searchQuery={searchQuery}
              selectedResult={selectedResult}
            />
          ) : null}

          {currentStep === 2 ? (
            <IntakeVisitStep draft={draft} onDraftChange={updateDraft} />
          ) : null}

          {currentStep === 3 ? (
            <IntakeServiceStep
              draft={draft}
              estimatedTotal={estimatedTotal}
              onPaymentTypeChange={(paymentType) => updateDraft({ paymentType })}
              onToggleService={toggleService}
              selectedServices={selectedServices}
              serviceOptions={context.serviceOptions}
            />
          ) : null}

          {currentStep === 4 ? (
            <IntakeRoutingStep
              doctorAvailability={context.doctorAvailability}
              draft={draft}
              onQueueOptionChange={setQueueOption}
              onSelectDoctor={selectDoctor}
              queueOption={queueOption}
              selectedDoctor={selectedDoctor}
            />
          ) : null}

          <footer className="sticky bottom-0 z-10 rounded-xl border border-slate-200 bg-white/95 p-2 shadow-[0_-8px_18px_rgba(15,23,42,0.06)] backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Link
                className="inline-flex h-9 items-center rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 hover:border-slate-300 hover:text-slate-950"
                href="/app/reception"
              >
                Qabulxonaga qaytish
              </Link>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  className="inline-flex h-9 items-center rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 hover:border-slate-300 hover:text-slate-950 disabled:opacity-45"
                  disabled={currentStep === 1}
                  onClick={() => setCurrentStep((step) => Math.max(1, step - 1))}
                  type="button"
                >
                  Oldingi
                </button>
                <button
                  className="inline-flex h-9 items-center rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 hover:border-slate-300 hover:text-slate-950 disabled:opacity-45"
                  disabled={currentStep === intakeSteps.length}
                  onClick={() => setCurrentStep((step) => Math.min(intakeSteps.length, step + 1))}
                  type="button"
                >
                  Keyingi
                </button>
                <button
                  className="inline-flex h-9 items-center rounded-lg border border-teal-200 bg-teal-50 px-3 text-sm font-semibold text-teal-800 hover:bg-teal-100 disabled:opacity-55"
                  disabled={isWorking}
                  onClick={handlePreview}
                  type="button"
                >
                  Qabulni ko‘rish
                </button>
                <button
                  className="inline-flex h-9 items-center rounded-lg border border-teal-700 bg-teal-700 px-3 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(15,118,110,0.18)] hover:bg-teal-800 disabled:opacity-55"
                  disabled={isWorking}
                  onClick={handleCreate}
                  type="button"
                >
                  Mock rejimda tashrif yaratish
                </button>
              </div>
            </div>
          </footer>
        </main>

        <IntakePreviewRail
          contextWarnings={context.warnings}
          draft={draft}
          estimatedTotal={estimatedTotal}
          missingFields={missingFields}
          preview={preview}
          queueOption={queueOption}
          recommendation={recommendation}
          selectedDoctor={selectedDoctor}
          selectedPatient={selectedResult}
          selectedServices={selectedServices}
        />
      </div>
    </div>
  );
}

function createInitialDraft(context: ReceptionIntakeContext): ReceptionIntakeDraft {
  return {
    patientId: null,
    appointmentId: null,
    visitType: "walk_in",
    reason: "",
    priority: "normal",
    source: "walk_in",
    departmentId: context.doctorAvailability[0]?.department.id ?? null,
    doctorId: context.doctorAvailability[0]?.doctor.id ?? null,
    serviceIds: context.serviceOptions[0]?.id ? [context.serviceOptions[0].id] : [],
    paymentType: "cash",
    notes: "",
  };
}

function getMissingFields(draft: ReceptionIntakeDraft, queueOption: IntakeQueueOption): string[] {
  const missing: string[] = [];
  if (!draft.patientId && !draft.newPatient?.fullName.trim()) missing.push("Bemor");
  if (!draft.reason.trim()) missing.push("Sabab");
  if (draft.serviceIds.length === 0) missing.push("Xizmat");
  if (queueOption !== "create_only" && !draft.doctorId) missing.push("Shifokor");
  return missing;
}

function getRecommendation(queueOption: IntakeQueueOption): string {
  if (queueOption === "assign_only") return "Tashrif yaratib shifokor biriktirish";
  if (queueOption === "assign_and_queue") return "Tashrif yaratib navbatga qo‘yish";
  return "Faqat tashrif yaratish";
}

function formatMoney(amount: number): string {
  return `${new Intl.NumberFormat("uz-UZ").format(amount)} UZS`;
}

function HeaderMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-right">
      <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{label}</div>
      <div className="mt-0.5 text-sm font-bold text-slate-950">{value}</div>
    </div>
  );
}

function SuccessPanel({ message, onReset }: { message: string; onReset: () => void }) {
  return (
    <section className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-emerald-950">{message}</h2>
          <p className="mt-0.5 text-xs text-emerald-800">
            Haqiqiy tashrif saqlanmadi. Bu guided intake flow mock rejimda ishlayotganini tasdiqlaydi.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            className="inline-flex h-8 items-center rounded-lg border border-emerald-200 bg-white px-2.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-50"
            href="/app/reception"
          >
            Qabulxonaga qaytish
          </Link>
          <Link
            className="inline-flex h-8 items-center rounded-lg border border-emerald-200 bg-white px-2.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-50"
            href="/app/visits"
          >
            Tashriflarni ochish
          </Link>
          <button
            className="inline-flex h-8 items-center rounded-lg border border-emerald-700 bg-emerald-700 px-2.5 text-xs font-semibold text-white hover:bg-emerald-800"
            onClick={onReset}
            type="button"
          >
            Yana qabul boshlash
          </button>
        </div>
      </div>
    </section>
  );
}
