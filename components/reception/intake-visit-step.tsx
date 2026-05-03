"use client";

import type { ReceptionIntakeDraft, ReceptionPriority, ReceptionSource } from "@/lib/types/reception";
import type { VisitType } from "@/lib/types/visits";

export type IntakeVisitStepProps = {
  draft: ReceptionIntakeDraft;
  onDraftChange: (patch: Partial<ReceptionIntakeDraft>) => void;
};

const visitTypes: { value: VisitType; label: string; hint: string }[] = [
  { value: "walk_in", label: "Navbatsiz", hint: "Bemor oldindan yozilmasdan keldi" },
  { value: "appointment", label: "Rejali qabul", hint: "Belgilangan qabulni tashrifga aylantirish" },
  { value: "follow_up", label: "Takroriy", hint: "Qayta kelgan bemor" },
  { value: "emergency", label: "Shoshilinch", hint: "Darhol klinik topshirish" },
];

const priorities: { value: ReceptionPriority; label: string }[] = [
  { value: "normal", label: "Oddiy" },
  { value: "urgent", label: "Tezkor" },
  { value: "emergency", label: "Shoshilinch" },
  { value: "vip", label: "VIP" },
];

const sources: { value: ReceptionSource; label: string }[] = [
  { value: "walk_in", label: "Navbatsiz kelgan" },
  { value: "phone", label: "Telefon" },
  { value: "telegram", label: "Telegram" },
  { value: "referral", label: "Yo‘llanma" },
  { value: "corporate", label: "Korporativ" },
  { value: "insurance", label: "Sug‘urta" },
  { value: "doctor_referral", label: "Shifokor yo‘llanmasi" },
];

export function IntakeVisitStep({ draft, onDraftChange }: IntakeVisitStepProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.05)]">
      <div className="border-b border-slate-200 bg-slate-50 px-3 py-2">
        <h2 className="text-sm font-semibold text-slate-950">Tashrif ma’lumotlari</h2>
        <p className="mt-0.5 text-xs text-slate-500">Kelish sababi va ustuvorlik darajasini kiriting.</p>
      </div>
      <div className="space-y-4 p-3">
        <div>
          <Label text="Tashrif turi" />
          <div className="grid gap-2 md:grid-cols-4">
            {visitTypes.map((item) => (
              <ChoiceCard
                active={draft.visitType === item.value}
                key={item.value}
                label={item.label}
                hint={item.hint}
                onClick={() => onDraftChange({ visitType: item.value })}
              />
            ))}
          </div>
        </div>

        <div>
          <Label required text="Kelish sababi / asosiy shikoyat" />
          <textarea
            className="min-h-20 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
            onChange={(event) => onDraftChange({ reason: event.target.value })}
            placeholder="Bemor nima sababdan kelganini yozing..."
            value={draft.reason}
          />
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <div>
            <Label text="Ustuvorlik" />
            <div className="grid grid-cols-2 gap-2">
              {priorities.map((item) => (
                <button
                  className={[
                    "rounded-lg border px-3 py-2 text-left text-sm font-semibold",
                    draft.priority === item.value
                      ? "border-teal-300 bg-teal-50 text-teal-950"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                  ].join(" ")}
                  key={item.value}
                  onClick={() => onDraftChange({ priority: item.value })}
                  type="button"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label text="Manba" />
            <select
              className="h-9 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
              onChange={(event) => onDraftChange({ source: event.target.value as ReceptionSource })}
              value={draft.source}
            >
              {sources.map((source) => (
                <option key={source.value} value={source.value}>
                  {source.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <Label text="Izoh" />
          <textarea
            className="min-h-16 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
            onChange={(event) => onDraftChange({ notes: event.target.value })}
            placeholder="Qabulxona uchun ixtiyoriy izoh"
            value={draft.notes ?? ""}
          />
        </div>
      </div>
    </section>
  );
}

function Label({ text, required }: { text: string; required?: boolean }) {
  return (
    <span className="mb-1.5 block text-xs font-semibold text-slate-600">
      {text} {required ? <span className="text-red-600">*</span> : null}
    </span>
  );
}

function ChoiceCard({ label, hint, active, onClick }: { label: string; hint: string; active: boolean; onClick: () => void }) {
  return (
    <button
      className={[
        "rounded-xl border px-3 py-2 text-left transition-colors",
        active ? "border-teal-300 bg-teal-50 text-teal-950" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
      ].join(" ")}
      onClick={onClick}
      type="button"
    >
      <span className="block text-sm font-semibold">{label}</span>
      <span className="mt-0.5 block text-xs opacity-70">{hint}</span>
    </button>
  );
}
