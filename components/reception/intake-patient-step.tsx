"use client";

import type { ReactNode } from "react";
import type { ReceptionIntakeDraft, ReceptionPatientSearchResult } from "@/lib/types/reception";
import { ReceptionPatientResultCard } from "@/components/reception/reception-patient-result-card";

export type IntakePatientStepProps = {
  draft: ReceptionIntakeDraft;
  searchQuery: string;
  results: ReceptionPatientSearchResult[];
  selectedResult?: ReceptionPatientSearchResult | null;
  onSearchChange: (value: string) => void;
  onSelectPatient: (result: ReceptionPatientSearchResult) => void;
  onNewPatientChange: (patient: NonNullable<ReceptionIntakeDraft["newPatient"]>) => void;
};

export function IntakePatientStep({
  draft,
  searchQuery,
  results,
  selectedResult,
  onSearchChange,
  onSelectPatient,
  onNewPatientChange,
}: IntakePatientStepProps) {
  const newPatient = draft.newPatient ?? {
    fullName: "",
    phone: "",
    gender: "unknown",
    birthDate: "",
    age: null,
  };
  const hasSelectedPatient = Boolean(draft.patientId);

  return (
    <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_340px]">
      <section className="rounded-xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.05)]">
        <div className="border-b border-slate-200 bg-slate-50 px-3 py-2">
          <h2 className="text-sm font-semibold text-slate-950">Mavjud bemorni topish</h2>
          <p className="mt-0.5 text-xs text-slate-500">Ism, telefon yoki bemor kodi bo‘yicha qidiring.</p>
        </div>
        <div className="space-y-2 p-3">
          <input
            className="h-9 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none placeholder:text-slate-400 focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Aliyev, +998, P-2026..."
            type="search"
            value={searchQuery}
          />

          <div className="max-h-[520px] space-y-2 overflow-auto pr-1">
            {results.length ? (
              results.map((result) => (
                <ReceptionPatientResultCard
                  key={result.patient.id}
                  onSelect={onSelectPatient}
                  result={result}
                  selected={selectedResult?.patient.id === result.patient.id}
                />
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-3 py-6 text-sm text-slate-500">
                Mos bemor topilmadi. O‘ng tomonda minimal yangi bemor yarating.
              </div>
            )}
          </div>
        </div>
      </section>

      <section
        className={[
          "rounded-xl border bg-white shadow-[0_1px_2px_rgba(15,23,42,0.05)]",
          hasSelectedPatient ? "border-slate-200 opacity-75" : "border-teal-200 ring-2 ring-teal-50",
        ].join(" ")}
      >
        <div className="border-b border-slate-200 bg-slate-50 px-3 py-2">
          <h2 className="text-sm font-semibold text-slate-950">Minimal yangi bemor</h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Buni faqat mavjud profil mos kelmaganda ishlating.
          </p>
        </div>
        <div className="space-y-3 p-3">
          <Field label="To‘liq ism" required>
            <input
              className={fieldInputClass}
              onChange={(event) => onNewPatientChange({ ...newPatient, fullName: event.target.value })}
              placeholder="To‘liq ism"
              value={newPatient.fullName}
            />
          </Field>
          <Field label="Telefon">
            <input
              className={fieldInputClass}
              onChange={(event) => onNewPatientChange({ ...newPatient, phone: event.target.value })}
              placeholder="+998"
              value={newPatient.phone ?? ""}
            />
          </Field>
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Jinsi">
              <select
                className={fieldInputClass}
                onChange={(event) => onNewPatientChange({ ...newPatient, gender: event.target.value as NonNullable<typeof newPatient.gender> })}
                value={newPatient.gender ?? "unknown"}
              >
                <option value="unknown">Noma’lum</option>
                <option value="male">Erkak</option>
                <option value="female">Ayol</option>
                <option value="other">Boshqa</option>
              </select>
            </Field>
            <Field label="Yoshi">
              <input
                className={fieldInputClass}
                min={0}
                onChange={(event) => onNewPatientChange({ ...newPatient, age: event.target.value ? Number(event.target.value) : null })}
                placeholder="Yoshi"
                type="number"
                value={newPatient.age ?? ""}
              />
            </Field>
          </div>
          <Field label="Tug‘ilgan sana">
            <input
              className={fieldInputClass}
              onChange={(event) => onNewPatientChange({ ...newPatient, birthDate: event.target.value })}
              type="date"
              value={newPatient.birthDate ?? ""}
            />
          </Field>
        </div>
      </section>
    </div>
  );
}

const fieldInputClass =
  "h-9 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none placeholder:text-slate-400 focus:border-teal-400 focus:ring-2 focus:ring-teal-100";

function Field({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-slate-600">
        {label} {required ? <span className="text-red-600">*</span> : null}
      </span>
      {children}
    </label>
  );
}
