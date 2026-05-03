"use client";

import type {
  ReceptionDoctorAvailability,
  ReceptionIntakeDraft,
} from "@/lib/types/reception";

export type IntakeQueueOption = "assign_only" | "assign_and_queue" | "create_only";

export type IntakeRoutingStepProps = {
  draft: ReceptionIntakeDraft;
  doctorAvailability: ReceptionDoctorAvailability[];
  queueOption: IntakeQueueOption;
  selectedDoctor?: ReceptionDoctorAvailability | null;
  onSelectDoctor: (availability: ReceptionDoctorAvailability) => void;
  onQueueOptionChange: (option: IntakeQueueOption) => void;
};

const queueOptions: { value: IntakeQueueOption; label: string; hint: string }[] = [
  { value: "assign_and_queue", label: "Biriktirib navbatga qo‘yish", hint: "Tashrif yaratib bemorni shifokor navbatiga qo‘yish" },
  { value: "assign_only", label: "Faqat biriktirish", hint: "Shifokorni tanlash, navbatga hozircha qo‘ymaslik" },
  { value: "create_only", label: "Faqat yaratish", hint: "Tashrif yaratish, keyinroq yo‘naltirish" },
];

export function IntakeRoutingStep({
  draft,
  doctorAvailability,
  queueOption,
  selectedDoctor,
  onSelectDoctor,
  onQueueOptionChange,
}: IntakeRoutingStepProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.05)]">
      <div className="border-b border-slate-200 bg-slate-50 px-3 py-2">
        <h2 className="text-sm font-semibold text-slate-950">Yo‘naltirish</h2>
        <p className="mt-0.5 text-xs text-slate-500">
          Shifokorni tanlang va bemor hozir navbatga qo‘yilishini belgilang.
        </p>
      </div>

      <div className="space-y-4 p-3">
        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Shifokorlar holati
              </h3>
              <p className="mt-0.5 text-xs text-slate-500">
                Band shifokorni tanlash mumkin; mavjud bo‘lmagan shifokorlar o‘chiq turadi.
              </p>
            </div>
            {selectedDoctor ? (
              <span className="rounded-full border border-teal-200 bg-teal-50 px-2 py-0.5 text-xs font-semibold text-teal-800">
                Kutish {selectedDoctor.estimatedWaitMinutes} daq
              </span>
            ) : null}
          </div>

          <div className="grid gap-2 md:grid-cols-2">
            {doctorAvailability.map((availability) => {
              const disabled = availability.status === "unavailable" || availability.status === "off_shift";
              const selected = draft.doctorId === availability.doctor.id;
              return (
                <button
                  className={[
                    "rounded-xl border p-3 text-left transition-colors",
                    selected
                      ? "border-teal-300 bg-teal-50 text-teal-950 ring-1 ring-teal-100"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
                    disabled ? "cursor-not-allowed opacity-55 hover:border-slate-200 hover:bg-white" : "",
                  ].join(" ")}
                  disabled={disabled}
                  key={availability.doctor.id}
                  onClick={() => onSelectDoctor(availability)}
                  type="button"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-slate-950">
                        {availability.doctor.fullName}
                      </div>
                      <div className="mt-0.5 truncate text-xs text-slate-500">
                        {availability.doctor.specialization} / {availability.department.name}
                      </div>
                    </div>
                    <StatusPill status={availability.status} />
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-1.5 text-xs">
                    <Metric label="Navbat" value={String(availability.currentQueueCount)} />
                    <Metric label="Kutish" value={`${availability.estimatedWaitMinutes} daq`} />
                    <Metric label="Xona" value={availability.room ?? "yo‘q"} />
                  </div>

                  {availability.nextAvailableAt ? (
                    <p className="mt-2 text-xs text-slate-500">
                      Keyingi bo‘sh vaqt: {formatTime(availability.nextAvailableAt)}
                    </p>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Navbat varianti
          </h3>
          <div className="mt-2 grid gap-2 md:grid-cols-3">
            {queueOptions.map((option) => (
              <button
                className={[
                  "rounded-lg border px-3 py-2 text-left transition-colors",
                  queueOption === option.value
                    ? "border-teal-300 bg-white text-teal-950 ring-1 ring-teal-100"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300",
                ].join(" ")}
                key={option.value}
                onClick={() => onQueueOptionChange(option.value)}
                type="button"
              >
                <span className="block text-sm font-semibold">{option.label}</span>
                <span className="mt-0.5 block text-xs text-slate-500">{option.hint}</span>
              </button>
            ))}
          </div>

          {selectedDoctor?.status === "busy" ? (
            <p className="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-900">
              {selectedDoctor.doctor.fullName} band. Taxminiy kutish vaqti{" "}
              {selectedDoctor.estimatedWaitMinutes} daqiqa.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function StatusPill({ status }: { status: ReceptionDoctorAvailability["status"] }) {
  const tone = {
    available: "border-emerald-200 bg-emerald-50 text-emerald-800",
    busy: "border-amber-200 bg-amber-50 text-amber-900",
    unavailable: "border-red-200 bg-red-50 text-red-800",
    off_shift: "border-slate-200 bg-slate-100 text-slate-600",
  }[status];

  return (
    <span className={["rounded-full border px-2 py-0.5 text-[11px] font-semibold capitalize", tone].join(" ")}>
      {formatDoctorStatus(status)}
    </span>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-2 py-1">
      <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{label}</div>
      <div className="mt-0.5 truncate font-semibold text-slate-800">{value}</div>
    </div>
  );
}

function formatTime(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("uz-UZ", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatDoctorStatus(status: ReceptionDoctorAvailability["status"]): string {
  if (status === "available") return "Mavjud";
  if (status === "busy") return "Band";
  if (status === "unavailable") return "Mavjud emas";
  return "Smenada emas";
}
