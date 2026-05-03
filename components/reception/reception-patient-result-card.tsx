"use client";

import Link from "next/link";
import type { ReceptionPatientSearchResult } from "@/lib/types/reception";

export type ReceptionPatientResultCardProps = {
  result: ReceptionPatientSearchResult;
  selected: boolean;
  onSelect: (result: ReceptionPatientSearchResult) => void;
};

export function ReceptionPatientResultCard({ result, selected, onSelect }: ReceptionPatientResultCardProps) {
  const { patient } = result;

  return (
    <article
      className={[
        "rounded-xl border bg-white p-3 shadow-[0_1px_1px_rgba(15,23,42,0.04)] transition-colors",
        selected ? "border-teal-300 ring-2 ring-teal-100" : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60",
      ].join(" ")}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-slate-950">{patient.fullName}</h3>
          <p className="mt-0.5 truncate text-xs text-slate-500">
            {patient.patientCode} / {patient.age ?? "Yosh yo‘q"} / {formatGender(patient.gender)} / {patient.phone ?? "Telefon yo‘q"}
          </p>
        </div>
        {result.duplicateScore ? (
          <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-900">
            Dublikat {result.duplicateScore}%
          </span>
        ) : null}
      </div>

      <div className="mt-2 grid gap-1.5 text-xs text-slate-600 md:grid-cols-3">
        <InfoPill label="Faol tashrif" value={result.activeVisit?.visitCode ?? "Yo‘q"} tone={result.activeVisit ? "warning" : "neutral"} />
        <InfoPill label="Balans" value={result.balance?.formatted ?? "0 UZS"} tone={result.balance && result.balance.amount > 0 ? "danger" : "neutral"} />
        <InfoPill label="Risk" value={result.riskFlags?.length ? result.riskFlags.join(", ") : "Belgilar yo‘q"} tone={result.riskFlags?.length ? "warning" : "neutral"} />
      </div>

      {result.duplicateReason ? <p className="mt-2 text-xs text-amber-800">{result.duplicateReason}</p> : null}

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          className="inline-flex h-7 items-center rounded-lg border border-teal-700 bg-teal-700 px-2.5 text-xs font-semibold text-white hover:bg-teal-800"
          onClick={() => onSelect(result)}
          type="button"
        >
          Bemorni tanlash
        </button>
        <Link
          className="inline-flex h-7 items-center rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-semibold text-slate-600 hover:border-slate-300 hover:text-slate-900"
          href={`/app/patients/${patient.id}`}
        >
          Profilni ochish
        </Link>
      </div>
    </article>
  );
}

function formatGender(gender: ReceptionPatientSearchResult["patient"]["gender"]): string {
  if (gender === "male") return "Erkak";
  if (gender === "female") return "Ayol";
  if (gender === "other") return "Boshqa";
  return "Noma’lum";
}

function InfoPill({ label, value, tone }: { label: string; value: string; tone: "neutral" | "warning" | "danger" }) {
  const toneClass = {
    neutral: "border-slate-200 bg-slate-50 text-slate-700",
    warning: "border-amber-200 bg-amber-50 text-amber-900",
    danger: "border-red-200 bg-red-50 text-red-900",
  }[tone];

  return (
    <div className={["rounded-lg border px-2 py-1", toneClass].join(" ")}>
      <span className="block text-[10px] font-semibold uppercase tracking-wide opacity-70">{label}</span>
      <span className="mt-0.5 block truncate font-medium">{value}</span>
    </div>
  );
}
