import Link from "next/link";
import { WorkbenchListCard } from "@/components/workbench/workbench-list-card";
import { WorkbenchRowLimit } from "@/components/workbench/workbench-row-limit";
import { WorkbenchTableHeader, WorkbenchTableRow } from "@/components/workbench/workbench-table-row";
import { getReceptionQueueControl, getReceptionWorkspace } from "@/lib/api/client";
import type { AppointmentListItem } from "@/lib/types/appointments";
import type { PatientListItem } from "@/lib/types/patients";
import type { ReceptionDelayedCase, ReceptionDoctorAvailability, ReceptionQueueItem } from "@/lib/types/reception";
import type { NextActionData, StatusBadgeData } from "@/lib/types/shared";
import type { VisitListItem } from "@/lib/types/visits";

type QueueKey = "needs_action" | "in_progress" | "billing" | "closed" | "all";

type Props = {
  searchParams?: Promise<{ queue?: string }>;
};

export default async function ReceptionWorkspacePage({ searchParams }: Props) {
  const [resolvedSearchParams, workspace, queueControl] = await Promise.all([
    searchParams ?? Promise.resolve({} as { queue?: string }),
    getReceptionWorkspace(),
    getReceptionQueueControl(),
  ]);
  const selectedQueueKey = normalizeQueueKey(resolvedSearchParams.queue);
  const queueItemsByVisitId = new Map(queueControl.queues.byWaitingTime.items.map((item) => [item.id, item]));
  const queues = {
    needs_action: workspace.queues.needsAction.items,
    in_progress: workspace.queues.inProgress.items,
    billing: workspace.queues.billingAndClosing.items,
    closed: workspace.queues.closedToday.items,
  };
  const selectedItems = selectedQueueKey === "all" ? [...queues.needs_action, ...queues.in_progress, ...queues.billing, ...queues.closed] : queues[selectedQueueKey];
  const activeCaseCount = queues.needs_action.length + queues.in_progress.length + queues.billing.length;
  const delayedCount = queueControl.rightPanel.delayedCases.filter((item) => item.severity === "critical" || item.severity === "warning").length;

  return (
    <div>
      <section className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_330px]">
        <main className="min-w-0">
          <WorkbenchListCard
            title="Qabul oqimi"
            summary={`${selectedItems.length} holat / avval 8 qator ko'rinadi`}
            selectedKey={selectedQueueKey}
            selector={[
              { key: "needs_action", label: "Harakat kerak", count: workspace.queues.needsAction.count, href: "/app/reception?queue=needs_action" },
              { key: "in_progress", label: "Jarayonda", count: workspace.queues.inProgress.count, href: "/app/reception?queue=in_progress" },
              { key: "billing", label: "To'lov", count: workspace.queues.billingAndClosing.count, href: "/app/reception?queue=billing" },
              { key: "closed", label: "Yopilgan", count: workspace.queues.closedToday.count, href: "/app/reception?queue=closed" },
              { key: "all", label: "Barchasi", count: activeCaseCount + queues.closed.length, href: "/app/reception?queue=all" },
            ]}
            filters={["Doctor", "Department", "SLA", "Priority"]}
            fullListHref="/app/reception/queue"
            fullListLabel="To'liq navbat"
            searchPlaceholder="List ichida qidirish..."
          >
            {selectedItems.length ? (
              <>
                <WorkbenchTableHeader />
                <WorkbenchRowLimit initialCount={8}>
                  {selectedItems.map((visit) => (
                    <ReceptionWorkbenchRow key={visit.id} queueItem={queueItemsByVisitId.get(visit.id)} visit={visit} />
                  ))}
                </WorkbenchRowLimit>
              </>
            ) : (
              <div className="border-t border-slate-100 px-3 py-8 text-center text-sm text-slate-500">Bu ko&apos;rinishda ochiq holat yo&apos;q.</div>
            )}
          </WorkbenchListCard>
        </main>

        <aside className="space-y-3">
          <FlowChartPanel
            items={[
              { label: "Harakat", value: workspace.queues.needsAction.count, href: "/app/reception?queue=needs_action", tone: "warning" },
              { label: "Jarayon", value: workspace.queues.inProgress.count, href: "/app/reception?queue=in_progress", tone: "accent" },
              { label: "To'lov", value: workspace.queues.billingAndClosing.count, href: "/app/reception?queue=billing", tone: "warning" },
              { label: "Yopilgan", value: workspace.queues.closedToday.count, href: "/app/reception?queue=closed", tone: "success" },
              { label: "SLA", value: delayedCount, href: "/app/reception/delayed", tone: delayedCount ? "danger" : "neutral" },
            ]}
            controlItems={queueControl.summary}
          />
          <TodayAppointments appointments={workspace.rightPanel.todayAppointments} />
          <DoctorLoadPanel doctors={queueControl.rightPanel.doctorLoad} />
          <RecentRegistrationsPanel patients={workspace.rightPanel.recentRegistrations} />
          <AlertsPanel delayedCases={queueControl.rightPanel.delayedCases} bottlenecks={queueControl.rightPanel.bottlenecks} />
        </aside>
      </section>
    </div>
  );
}

function ReceptionWorkbenchRow({ visit, queueItem }: { visit: VisitListItem; queueItem?: ReceptionQueueItem }) {
  const action = receptionOwnedAction(visit.nextAction, visit.workflowStatus, visit.id);
  return (
    <WorkbenchTableRow
      title={visit.patient.fullName}
      subtitle={[visit.patient.patientCode, visit.patient.phone].filter(Boolean).join(" / ")}
      href={`/app/visits/${visit.id}`}
      reference={visit.visitCode}
      context={[visit.department?.name, visit.doctor?.fullName ?? "Shifokor biriktirilmagan", visit.reason].filter(Boolean).join(" / ")}
      primaryBadge={localizeStatusBadge(visit.workflowBadge)}
      secondaryBadge={visit.invoiceBadge ? localizeStatusBadge(visit.invoiceBadge) : undefined}
      signals={[formatMinutes(queueItem?.waitingMinutes), formatSla(queueItem?.slaState), visit.doctor?.fullName ?? "Owner yo'q"]}
      nextAction={action.label}
      primaryAction={{ label: action.cta, href: action.href }}
      secondaryActions={[
        { label: "Tashrifni ochish", href: `/app/visits/${visit.id}`, variant: "secondary" },
        { label: "Bemor profili", href: `/app/patients/${visit.patient.id}`, variant: "secondary" },
        { label: "Navbat", href: "/app/reception/queue", variant: "secondary" },
      ]}
    />
  );
}

function FlowChartPanel({
  items,
  controlItems,
}: {
  items: { label: string; value: number; href: string; tone: "neutral" | "accent" | "warning" | "danger" | "success" }[];
  controlItems: { key: string; label: string; count: number; tone?: string }[];
}) {
  const max = Math.max(...items.map((item) => item.value), ...controlItems.map((item) => item.count), 1);
  return (
    <section className="rounded-md border border-slate-200 bg-white p-3">
      <h2 className="text-sm font-semibold text-slate-950">Oqim holati</h2>
      <div className="mt-2 space-y-2">
        {items.map((item) => (
          <Link className="grid grid-cols-[70px_minmax(0,1fr)_28px] items-center gap-2 text-xs hover:bg-slate-50" href={item.href} key={item.label}>
            <span className="font-semibold text-slate-600">{item.label}</span>
            <span className="h-2 rounded-full bg-slate-100">
              <span className={["block h-2 rounded-full", flowToneClass(item.tone)].join(" ")} style={{ width: `${Math.max(8, Math.round((item.value / max) * 100))}%` }} />
            </span>
            <span className="text-right font-mono font-semibold text-slate-800">{item.value}</span>
          </Link>
        ))}
      </div>
      <div className="mt-3 border-t border-slate-100 pt-3">
        <div className="mb-2 flex items-center justify-between gap-2">
          <h3 className="text-xs font-semibold uppercase tracking-normal text-slate-500">Navbat nazorati</h3>
          <Link className="text-xs font-semibold text-teal-700" href="/app/reception/queue">Open</Link>
        </div>
        <div className="space-y-2">
          {controlItems.slice(0, 4).map((item) => (
            <Link className="grid grid-cols-[86px_minmax(0,1fr)_28px] items-center gap-2 text-xs hover:bg-slate-50" href="/app/reception/queue" key={item.key}>
              <span className="truncate font-semibold text-slate-600">{localizeControlLabel(item.label)}</span>
              <span className="h-2 rounded-full bg-slate-100">
                <span className={["block h-2 rounded-full", controlToneClass(item.tone)].join(" ")} style={{ width: `${Math.max(8, Math.round((item.count / max) * 100))}%` }} />
              </span>
              <span className="text-right font-mono font-semibold text-slate-800">{item.count}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function flowToneClass(tone: "neutral" | "accent" | "warning" | "danger" | "success"): string {
  if (tone === "accent") return "bg-teal-600";
  if (tone === "warning") return "bg-amber-500";
  if (tone === "danger") return "bg-red-600";
  if (tone === "success") return "bg-emerald-600";
  return "bg-slate-300";
}

function controlToneClass(tone?: string): string {
  if (tone === "danger") return "bg-red-600";
  if (tone === "warning") return "bg-amber-500";
  if (tone === "accent" || tone === "info") return "bg-teal-600";
  if (tone === "success") return "bg-emerald-600";
  return "bg-slate-300";
}

function TodayAppointments({ appointments }: { appointments: AppointmentListItem[] }) {
  return (
    <section className="rounded-md border border-slate-200 bg-white p-3">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-slate-950">Bugungi qabullar</h2>
        <Link className="text-xs font-semibold text-teal-700" href="/app/reception/appointments-today">View all</Link>
      </div>
      <div className="mt-2 divide-y divide-slate-100">
        {appointments.slice(0, 5).map((appointment) => (
          <Link className="grid grid-cols-[42px_minmax(0,1fr)_auto] items-center gap-2 py-2 hover:bg-slate-50" href={`/app/appointments/${appointment.id}`} key={appointment.id}>
            <span className="font-mono text-xs font-semibold text-slate-700">{formatTime(appointment.scheduledStart)}</span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-slate-900">{appointment.patient.fullName}</span>
              <span className="block truncate text-xs text-slate-500">{appointment.doctor.fullName}</span>
            </span>
            <span className="text-xs font-semibold text-slate-500">{localizeText(appointment.statusBadge.label)}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function RecentRegistrationsPanel({ patients }: { patients: PatientListItem[] }) {
  return (
    <section className="rounded-md border border-slate-200 bg-white p-3">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-slate-950">Yangi ro&apos;yxatlar</h2>
        <Link className="text-xs font-semibold text-teal-700" href="/app/reception/patient-search">Bemorlar</Link>
      </div>
      <div className="mt-2 divide-y divide-slate-100">
        {patients.slice(0, 5).map((patient) => (
          <Link className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 py-2 hover:bg-slate-50" href={`/app/patients/${patient.id}`} key={patient.id}>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-slate-900">{patient.fullName}</span>
              <span className="block truncate text-xs text-slate-500">{[patient.patientCode, patient.phone].filter(Boolean).join(" / ")}</span>
            </span>
            <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-semibold text-slate-600">Ochish</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function DoctorLoadPanel({ doctors }: { doctors: ReceptionDoctorAvailability[] }) {
  const max = Math.max(...doctors.map((item) => item.currentQueueCount), 1);
  return (
    <section className="rounded-md border border-slate-200 bg-white p-3">
      <h2 className="text-sm font-semibold text-slate-950">Shifokor yuklamasi</h2>
      <div className="mt-2 space-y-2">
        {doctors.slice(0, 5).map((item) => (
          <div className="grid gap-1" key={item.doctor.id}>
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="truncate font-semibold text-slate-800">{item.doctor.fullName}</span>
              <span className="text-slate-500">{item.currentQueueCount} / {item.estimatedWaitMinutes} daq</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-100">
              <div className="h-1.5 rounded-full bg-teal-600" style={{ width: `${Math.round((item.currentQueueCount / max) * 100)}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AlertsPanel({ delayedCases, bottlenecks }: { delayedCases: ReceptionDelayedCase[]; bottlenecks: string[] }) {
  const alerts = [
    ...delayedCases.map((item) => ({
      id: item.id,
      title: item.visit.patient.fullName,
      detail: `${formatDelayType(item.delayType)} / ${item.waitingMinutes} daq / ${item.owner}`,
      critical: item.severity === "critical",
      href: "/app/reception/delayed",
    })),
    ...bottlenecks.map((item) => ({ id: item, title: "Operatsion signal", detail: localizeBottleneck(item), critical: false, href: "/app/reception/delayed" })),
  ];
  return (
    <section className="rounded-md border border-slate-200 bg-white p-3">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-slate-950">Ogohlantirishlar</h2>
        <Link className="text-xs font-semibold text-teal-700" href="/app/reception/delayed">Hammasi</Link>
      </div>
      <div className="mt-2 divide-y divide-slate-100">
        {alerts.slice(0, 4).map((alert) => (
          <Link className="block py-2 hover:bg-slate-50" href={alert.href} key={alert.id}>
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-sm font-semibold text-slate-900">{alert.title}</span>
              <span className={alert.critical ? "text-xs font-semibold text-red-700" : "text-xs font-semibold text-amber-700"}>{alert.critical ? "Kritik" : "Ogoh"}</span>
            </div>
            <div className="truncate text-xs text-slate-500">{alert.detail}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function normalizeQueueKey(value?: string): QueueKey {
  if (value === "in_progress" || value === "billing" || value === "closed" || value === "all") return value;
  return "all";
}

function receptionOwnedAction(action: NextActionData, workflowStatus: string, visitId: string): { label: string; cta: string; href: string } {
  if (workflowStatus === "intake_created") return { label: "Shifokor biriktirish", cta: "Biriktirish", href: "/app/reception/intake/new" };
  if (workflowStatus === "doctor_assigned") return { label: "Navbatga qo'yish", cta: "Navbat", href: "/app/reception/queue" };
  if (["consultation_completed", "billing_pending", "partially_paid"].includes(workflowStatus)) return { label: "To'lovni yakunlash", cta: "To'lov", href: "/app/reception/queue" };
  if (workflowStatus === "paid") return { label: "Tashrifni yopish", cta: "Yopish", href: "/app/reception/queue" };
  if (workflowStatus === "completed" || workflowStatus === "cancelled") return { label: "Tashrifni ko'rish", cta: "Ko'rish", href: `/app/visits/${visitId}` };
  return { label: localizeText(action.label), cta: localizeText(action.cta), href: action.targetRoute?.replace("[id]", visitId) ?? "/app/reception/queue" };
}

function localizeStatusBadge(badge: StatusBadgeData): StatusBadgeData {
  return { ...badge, label: localizeText(badge.label) };
}

function localizeText(value?: string): string {
  if (!value) return "";
  const labels: Record<string, string> = {
    Confirmed: "Tasdiq",
    Arrived: "Kelgan",
    "Intake created": "Qabul yaratildi",
    "Doctor assigned": "Shifokor biriktirildi",
    "Queued for doctor": "Shifokor navbatida",
    "With doctor": "Shifokorda",
    "Awaiting doctor review": "Review kutmoqda",
    "Consultation completed": "Konsultatsiya tugadi",
    "Billing pending": "To'lov kutilmoqda",
    "Partially paid": "Qisman to'langan",
    Paid: "To'langan",
    Completed: "Yakunlangan",
    Cancelled: "Bekor qilingan",
    "Open visit": "Tashrifni ochish",
    Open: "Ochish",
    View: "Ko'rish",
  };
  return labels[value] ?? value;
}

function localizeBottleneck(value: string): string {
  const labels: Record<string, string> = {
    "Cardiology queue exceeds 30 minutes.": "Kardiologiya navbati 30 daqiqadan oshgan.",
    "Two paid visits are not closed.": "Ikkita to'langan tashrif hali yopilmagan.",
    "Lab pending cases need ownership confirmation.": "Laboratoriya kutayotgan holatlar uchun mas'ul tasdiqlanishi kerak.",
  };
  return labels[value] ?? value;
}

function localizeControlLabel(value: string): string {
  const labels: Record<string, string> = {
    "Priority cases": "Priority",
    "Waiting > 30m": "30m+ kutish",
    "Billing / closing": "To'lov",
    Unresolved: "Ochiq signal",
  };
  return labels[value] ?? value;
}

function formatDelayType(value: ReceptionDelayedCase["delayType"]): string {
  const labels: Record<ReceptionDelayedCase["delayType"], string> = {
    waiting_for_doctor: "Shifokor kutmoqda",
    lab_pending: "Laboratoriya kutmoqda",
    radiology_pending: "Radiologiya kutmoqda",
    billing_pending: "To'lov kutmoqda",
    paid_not_closed: "To'langan, yopilmagan",
    no_show_candidate: "Kelmadi ehtimoli",
  };
  return labels[value];
}

function formatMinutes(value?: number): string {
  if (typeof value !== "number") return "Kutish yo'q";
  return value < 60 ? `${value} daq` : `${Math.floor(value / 60)} soat ${value % 60} daq`;
}

function formatSla(value?: ReceptionQueueItem["slaState"]): string {
  if (value === "breached") return "SLA buzilgan";
  if (value === "warning") return "SLA ogoh";
  return "SLA normal";
}

function formatTime(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("uz-UZ", { hour: "2-digit", minute: "2-digit" }).format(date);
}
