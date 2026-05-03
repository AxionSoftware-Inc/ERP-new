import Link from "next/link";
import { getReceptionQueueControl, getReceptionWorkspace } from "@/lib/api/client";
import { mockBranches } from "@/lib/mock/shared";
import type { AppointmentListItem } from "@/lib/types/appointments";
import type { PatientListItem } from "@/lib/types/patients";
import type { ReceptionDoctorAvailability, ReceptionQueueItem } from "@/lib/types/reception";
import type { NextActionData, StatusBadgeData } from "@/lib/types/shared";
import type { VisitListItem } from "@/lib/types/visits";
import { StatusBadge } from "@/components/status/status-badge";
import { OperatorCaseRow } from "@/components/workspace/operator-case-row";
import { QueueSection } from "@/components/workspace/queue-section";
import { SummaryStrip } from "@/components/workspace/summary-strip";
import { WorkspaceHeader } from "@/components/workspace/workspace-header";
import {
  WorkspaceRightPanel,
  type WorkspaceRightPanelSection,
} from "@/components/workspace/workspace-right-panel";

export default async function ReceptionWorkspacePage() {
  const [workspace, queueControl] = await Promise.all([
    getReceptionWorkspace(),
    getReceptionQueueControl(),
  ]);
  const queueItemsByVisitId = new Map(queueControl.queues.byWaitingTime.items.map((item) => [item.id, item]));
  const activeCaseCount =
    workspace.queues.needsAction.count +
    workspace.queues.inProgress.count +
    workspace.queues.billingAndClosing.count;
  const priorityVisits = dedupeVisits([
    ...workspace.queues.needsAction.items,
    ...workspace.queues.billingAndClosing.items,
    ...workspace.rightPanel.delayedCases,
  ]).slice(0, 3);

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-slate-100/80 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
      <div className="space-y-3">
      <WorkspaceHeader
        title="Qabulxona ish stoli"
        subtitle="Bugungi qabul, shifokorga yo‘naltirish va bemor oqimini boshqarish."
        branch={mockBranches[0]}
        meta={[
          { label: "Sana", value: "Bugun" },
          { label: "Smena", value: "Qabulxona" },
          { label: "Faol holatlar", value: String(activeCaseCount) },
        ]}
        primaryAction={{ label: "Yangi qabul", href: "/app/reception/intake/new" }}
      />

      <SummaryStrip items={workspace.summary.map(localizeSummaryItem)} />

      <section className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_350px]">
        <main className="min-w-0 space-y-3">
          <OperatorFocusPanel queueItemsByVisitId={queueItemsByVisitId} visits={priorityVisits} />

          <QueueSection
            title="Harakat kerak"
            description="Qabulxona tomonidan shifokor biriktirish yoki navbatga yuborish kutilayotgan tashriflar."
            count={workspace.queues.needsAction.count}
            items={workspace.queues.needsAction.items}
            renderItem={(visit, index) => (
              <ReceptionVisitRow
                queueItem={queueItemsByVisitId.get(visit.id)}
                queueLabel="Harakat kerak"
                queuePosition={index + 1}
                visit={visit}
              />
            )}
            emptyTitle="Qabulxonada bajarilishi kerak bo‘lgan harakat yo‘q."
            emptyDescription="Yangi qabul, shifokor biriktirish va navbat ishlari hozircha toza."
          />

          <QueueSection
            title="Jarayonda"
            description="Klinik yoki diagnostika jarayonida harakatlanayotgan tashriflar."
            count={workspace.queues.inProgress.count}
            items={workspace.queues.inProgress.items}
            renderItem={(visit, index) => (
              <ReceptionVisitRow
                queueItem={queueItemsByVisitId.get(visit.id)}
                queueLabel="Jarayonda"
                queuePosition={index + 1}
                visit={visit}
              />
            )}
            emptyTitle="Jarayondagi faol tashriflar yo‘q."
            emptyDescription="Klinik workflow’dagi faol tashriflar shu yerda ko‘rinadi."
          />

          <QueueSection
            title="To‘lov / yakunlash"
            description="Hisob, to‘lov yoki yakuniy yopishni kutayotgan tashriflar."
            count={workspace.queues.billingAndClosing.count}
            items={workspace.queues.billingAndClosing.items}
            renderItem={(visit, index) => (
              <ReceptionVisitRow
                queueItem={queueItemsByVisitId.get(visit.id)}
                queueLabel="To‘lov"
                queuePosition={index + 1}
                visit={visit}
              />
            )}
            emptyTitle="To‘lov yoki yakunlash kutayotgan tashrif yo‘q."
            emptyDescription="Kassa va yopish bo‘yicha topshiriqlar hozircha yo‘q."
          />

          <QueueSection
            title="Bugun yopilgan"
            description="Bugungi smenada yakunlangan yoki bekor qilingan tashriflar."
            count={workspace.queues.closedToday.count}
            items={workspace.queues.closedToday.items}
            renderItem={(visit, index) => (
              <ReceptionVisitRow
                queueItem={queueItemsByVisitId.get(visit.id)}
                queueLabel="Yopilgan"
                queuePosition={index + 1}
                visit={visit}
              />
            )}
            emptyTitle="Bugun yopilgan tashriflar hali yo‘q."
            emptyDescription="Yakunlangan yoki bekor qilingan tashriflar shu yerda chiqadi."
            maxVisibleItems={4}
            viewAllHref="/app/visits"
          />
        </main>

        <WorkspaceRightPanel
          sections={buildRightPanelSections(
            workspace.rightPanel,
            queueControl.rightPanel.doctorLoad,
            queueControl.rightPanel.bottlenecks,
          )}
        />
      </section>
      </div>
    </div>
  );
}

function OperatorFocusPanel({
  visits,
  queueItemsByVisitId,
}: {
  visits: VisitListItem[];
  queueItemsByVisitId: Map<string, ReceptionQueueItem>;
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-amber-200/80 bg-white shadow-[0_1px_2px_rgba(146,64,14,0.08)]">
      <div className="h-1 bg-amber-400" />
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-amber-200/70 bg-amber-50/80 px-3 py-2">
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-slate-950">Operator e’tiborida</h2>
          <p className="mt-0.5 text-xs leading-5 text-amber-900/70">
            Eng muhim qabul, to‘lov va kechikkan holatlar.
          </p>
        </div>
        <Link
          className="shrink-0 rounded-lg border border-amber-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-amber-900 hover:border-amber-300 hover:bg-amber-50"
          href="/app/reception/queue"
        >
          To‘liq navbat
        </Link>
      </div>

      {visits.length ? (
        <div className="grid gap-2 bg-amber-50/25 p-2 lg:grid-cols-3">
          {visits.map((visit) => (
            <FocusVisitCard
              key={visit.id}
              queueItem={queueItemsByVisitId.get(visit.id)}
              visit={visit}
            />
          ))}
        </div>
      ) : (
        <div className="bg-amber-50/25 p-2">
          <div className="rounded-lg border border-dashed border-slate-200 bg-white px-3 py-4 text-sm text-slate-500">
            Hozir qabulxonada ustuvor holatlar yo‘q.
          </div>
        </div>
      )}
    </section>
  );
}

function FocusMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-amber-100 bg-white/80 px-1.5 py-1">
      <div className="font-semibold uppercase tracking-wide text-amber-900/60">{label}</div>
      <div className="mt-0.5 truncate font-bold text-slate-900">{value}</div>
    </div>
  );
}

function FocusVisitCard({
  visit,
  queueItem,
}: {
  visit: VisitListItem;
  queueItem?: ReceptionQueueItem;
}) {
  const action = localizeAction(visit.nextAction);

  return (
    <Link
      className="group rounded-xl border border-amber-100 bg-white p-2.5 shadow-[0_1px_1px_rgba(146,64,14,0.06)] ring-1 ring-white/70 transition-colors hover:border-amber-200 hover:bg-amber-50/35"
      href={resolveActionHref(visit.nextAction, visit)}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold leading-5 text-slate-950">
            {visit.patient.fullName}
          </div>
          <div className="mt-0.5 truncate text-xs text-slate-500">
            {visit.visitCode} / {queueItem?.queueNumber ?? "Navbat yo‘q"} / {visit.patient.phone ?? "Telefon yo‘q"}
          </div>
        </div>
        <StatusBadge badge={localizeStatusBadge(visit.workflowBadge)} size="sm" />
      </div>

      <div className="mt-2 grid grid-cols-3 gap-1.5 text-[10.5px]">
        <FocusMetric label="Kutish" value={formatMinutes(queueItem?.waitingMinutes)} />
        <FocusMetric label="SLA" value={formatSla(queueItem?.slaState)} />
        <FocusMetric label="Ustuvor" value={formatPriority(queueItem?.priority)} />
      </div>

      <div className="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-2 py-1.5 text-xs text-amber-950">
        <span className="font-semibold text-teal-700">Keyingi</span>
        <span className="ml-1 font-medium">{action.label}</span>
      </div>

      <div className="mt-2 flex items-center justify-between gap-2">
        <span className="truncate text-[11px] font-medium text-slate-500">
          {formatOwnerRole(queueItem?.ownerRole)} / {visit.department?.name ?? "Bo‘lim tanlanmagan"}
        </span>
        <span className="inline-flex h-7 shrink-0 items-center rounded-lg bg-teal-700 px-2.5 text-xs font-semibold text-white shadow-[0_1px_2px_rgba(15,118,110,0.25)] group-hover:bg-teal-800">
          {action.cta || "Tashrifni ochish"}
        </span>
      </div>
    </Link>
  );
}

function ReceptionVisitRow({
  visit,
  queueLabel,
  queuePosition,
  queueItem,
}: {
  visit: VisitListItem;
  queueLabel: string;
  queuePosition: number;
  queueItem?: ReceptionQueueItem;
}) {
  return (
    <OperatorCaseRow
      identity={{
        title: visit.patient.fullName,
        subtitle: formatPatientSubtitle(visit),
        href: `/app/visits/${visit.id}`,
      }}
      reference={visit.visitCode}
      context={formatVisitContext(visit)}
      primaryBadge={localizeStatusBadge(visit.workflowBadge)}
      secondaryBadge={visit.invoiceBadge ? localizeStatusBadge(visit.invoiceBadge) : undefined}
      nextAction={localizeAction(visit.nextAction)}
      primaryAction={{
        label: localizeAction(visit.nextAction).cta || "Tashrifni ochish",
        href: resolveActionHref(visit.nextAction, visit),
      }}
      secondaryActions={[
        { label: "Tashrif", href: `/app/visits/${visit.id}` },
        { label: "Bemor", href: `/app/patients/${visit.patient.id}` },
      ]}
      meta={[
        { label: "Navbat", value: `${queueLabel} #${queuePosition}` },
        { label: "Raqam", value: queueItem?.queueNumber ?? "Yo‘q" },
        { label: "Kutish", value: formatMinutes(queueItem?.waitingMinutes) },
        { label: "SLA", value: formatSla(queueItem?.slaState) },
        { label: "Ustuvorlik", value: formatPriority(queueItem?.priority) },
        { label: "Mas’ul", value: formatOwnerRole(queueItem?.ownerRole) },
        { label: "Tashrif yoshi", value: formatMinutes(queueItem?.visitAgeMinutes) },
        { label: "Shifokor", value: visit.doctor?.fullName ?? "Biriktirilmagan" },
        { label: "Hisob", value: formatInvoiceSignal(visit) },
      ]}
    />
  );
}

function buildRightPanelSections(rightPanel: {
  todayAppointments: AppointmentListItem[];
  recentRegistrations: PatientListItem[];
  delayedCases: VisitListItem[];
}, doctorLoad: ReceptionDoctorAvailability[], bottlenecks: string[]): WorkspaceRightPanelSection[] {
  const waitingForDoctor = rightPanel.delayedCases.filter(
    (visit) => visit.workflowStatus === "queued_for_doctor",
  ).length;
  const billingWaiting = rightPanel.delayedCases.filter(
    (visit) => visit.workflowStatus === "billing_pending" || visit.workflowStatus === "partially_paid",
  ).length;

  return [
    {
      title: "Tez bemor qidirish",
      items: [
        <div className="space-y-2" key="patient-search">
          <input
            className="h-8 w-full rounded-lg border border-slate-300 bg-white px-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
            placeholder="Ism, telefon yoki bemor kodi"
            type="search"
          />
          <p className="text-xs leading-5 text-slate-500">Bemorni ism, telefon yoki bemor kodi orqali qidiring.</p>
          <div className="grid grid-cols-2 gap-2">
            <Link
              className="inline-flex h-7 items-center justify-center rounded-lg border border-slate-200 bg-white px-2 text-xs font-semibold text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
              href="/app/patients/new"
            >
              Yangi bemor
            </Link>
            <Link
              className="inline-flex h-7 items-center justify-center rounded-lg border border-teal-700 bg-teal-700 px-2 text-xs font-semibold text-white shadow-[0_1px_2px_rgba(15,118,110,0.25)] hover:bg-teal-800"
              href="/app/reception/intake/new"
            >
              Yangi qabul
            </Link>
          </div>
        </div>,
      ],
    },
    {
      title: "Qabulxona bo‘limlari",
      items: [
        <div className="grid grid-cols-2 gap-2" key="module-shortcuts">
          <ShortcutLink href="/app/reception/intake/new" label="Yangi qabul" />
          <ShortcutLink href="/app/reception/patient-search" label="Bemor qidirish" />
          <ShortcutLink href="/app/reception/check-in" label="Check-in" />
          <ShortcutLink href="/app/reception/walk-ins" label="Navbatsizlar" />
          <ShortcutLink href="/app/reception/queue" label="Navbat boshqaruvi" />
          <ShortcutLink href="/app/reception/delayed" label="Kechikkanlar" />
        </div>,
      ],
    },
    {
      title: "Bugungi qabullar",
      items: rightPanel.todayAppointments.slice(0, 5).map((appointment) => (
        <AppointmentLine appointment={appointment} key={appointment.id} />
      )),
      emptyTitle: "Bugun rejalashtirilgan qabul yo‘q.",
      emptyDescription: "Rejadagi qabullar shu yerda ko‘rinadi.",
    },
    {
      title: "Qabulxona nazorati",
      items: [
        <ControlMetric
          href="/app/reception/queue"
          key="waiting-for-doctor"
          label="Shifokor kutayotganlar"
          value={waitingForDoctor}
          tone="warning"
        />,
        <ControlMetric
          href="/app/cashier"
          key="billing-waiting"
          label="To‘lov kutayotganlar"
          value={billingWaiting}
          tone="success"
        />,
        <ControlMetric
          href="/app/reception/patient-search"
          key="recent-registrations"
          label="Yangi ro‘yxatlar"
          value={rightPanel.recentRegistrations.length}
          tone="neutral"
        />,
      ],
    },
    {
      title: "Shifokor yuklamasi",
      items: doctorLoad.slice(0, 5).map((availability) => (
        <DoctorLoadLine availability={availability} key={availability.doctor.id} />
      )),
      emptyTitle: "Shifokor yuklamasi ko‘rinmayapti.",
      emptyDescription: "Shifokor navbatlari mavjud bo‘lganda shu yerda chiqadi.",
    },
    {
      title: "Tiqilish signallari",
      items: bottlenecks.slice(0, 4).map((bottleneck) => (
        <BottleneckLine key={bottleneck} text={localizeBottleneck(bottleneck)} />
      )),
      emptyTitle: "Tiqilish signallari yo‘q.",
      emptyDescription: "Navbat, to‘lov yoki diagnostika tiqilishlari shu yerda ko‘rinadi.",
    },
    {
      title: "Kechikkan holatlar",
      items: rightPanel.delayedCases.slice(0, 5).map((visit) => (
        <DelayedVisitLine visit={visit} key={visit.id} />
      )),
      emptyTitle: "Kechikkan holatlar yo‘q.",
      emptyDescription: "Kutilgan vaqtdan oshgan tashriflar shu yerda chiqadi.",
    },
    {
      title: "Yangi ro‘yxatdan o‘tganlar",
      items: rightPanel.recentRegistrations.slice(0, 5).map((patient) => (
        <PatientLine patient={patient} key={patient.id} />
      )),
      emptyTitle: "Yangi ro‘yxatdan o‘tgan bemorlar yo‘q.",
      emptyDescription: "Yangi bemorlar shu yerda ko‘rinadi.",
    },
  ];
}

function ShortcutLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      className="inline-flex h-8 min-w-0 items-center justify-center rounded-lg border border-slate-200 bg-white px-2 text-center text-xs font-semibold text-slate-700 hover:border-teal-200 hover:bg-teal-50 hover:text-teal-800"
      href={href}
    >
      <span className="truncate">{label}</span>
    </Link>
  );
}

function AppointmentLine({ appointment }: { appointment: AppointmentListItem }) {
  return (
    <Link className="block min-w-0 hover:text-teal-700" href={`/app/appointments/${appointment.id}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-slate-950">
            {appointment.patient.fullName}
          </div>
          <div className="mt-0.5 truncate text-xs text-slate-600">
            {formatTime(appointment.scheduledStart)} / {appointment.doctor.fullName}
          </div>
          <div className="mt-1 text-[10.5px] font-medium uppercase tracking-wide text-slate-400">
            Qabul navbati
          </div>
        </div>
        <StatusBadge badge={localizeStatusBadge(appointment.statusBadge)} size="sm" />
      </div>
    </Link>
  );
}

function PatientLine({ patient }: { patient: PatientListItem }) {
  return (
    <Link className="block min-w-0 hover:text-teal-700" href={`/app/patients/${patient.id}`}>
      <div className="truncate text-sm font-semibold text-slate-950">{patient.fullName}</div>
      <div className="mt-0.5 truncate text-xs text-slate-600">
        {patient.patientCode} / {patient.phone ?? "Telefon yo‘q"}
      </div>
      <div className="mt-1 text-[10.5px] font-medium uppercase tracking-wide text-slate-400">
        {patient.activeVisitId ? "Faol tashrif" : patient.lastVisitAt ? `Oxirgi tashrif ${formatElapsed(patient.lastVisitAt)}` : "Yangi ro‘yxat"}
      </div>
    </Link>
  );
}

function ControlMetric({
  label,
  value,
  href,
  tone,
}: {
  label: string;
  value: number;
  href: string;
  tone: "neutral" | "warning" | "success";
}) {
  return (
    <Link className="flex items-center justify-between gap-3 hover:text-teal-700" href={href}>
      <span className="min-w-0 truncate text-xs font-semibold text-slate-700">{label}</span>
      <span className={["rounded-full border px-2 py-0.5 text-xs font-bold", getMetricToneClass(tone)].join(" ")}>
        {value}
      </span>
    </Link>
  );
}

function DoctorLoadLine({ availability }: { availability: ReceptionDoctorAvailability }) {
  return (
    <div className="min-w-0">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-slate-950">
            {availability.doctor.fullName}
          </div>
          <div className="mt-0.5 truncate text-xs text-slate-600">
            {availability.department.name} / xona {availability.room ?? "yo‘q"}
          </div>
        </div>
        <span className={["rounded-full border px-2 py-0.5 text-[11px] font-semibold", getDoctorStatusTone(availability.status)].join(" ")}>
          {formatDoctorStatus(availability.status)}
        </span>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-1.5 text-[11px]">
        <span className="rounded-lg border border-slate-200 bg-white px-2 py-1 font-medium text-slate-600">
          Navbat: <b className="text-slate-950">{availability.currentQueueCount}</b>
        </span>
        <span className="rounded-lg border border-slate-200 bg-white px-2 py-1 font-medium text-slate-600">
          Kutish: <b className="text-slate-950">{availability.estimatedWaitMinutes} daq</b>
        </span>
      </div>
    </div>
  );
}

function BottleneckLine({ text }: { text: string }) {
  return (
    <div className="rounded-lg border border-amber-100 bg-amber-50/80 px-2 py-1.5 text-xs font-medium leading-5 text-amber-900">
      {text}
    </div>
  );
}

function DelayedVisitLine({ visit }: { visit: VisitListItem }) {
  return (
    <Link className="block min-w-0 hover:text-teal-700" href={`/app/visits/${visit.id}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-slate-950">
            {visit.patient.fullName}
          </div>
          <div className="mt-0.5 truncate text-xs text-slate-600">
            {visit.visitCode} / {localizeAction(visit.nextAction).label}
          </div>
          <div className="mt-1 text-[10.5px] font-medium uppercase tracking-wide text-amber-700">
            Kutmoqda {formatElapsed(visit.updatedAt)}
          </div>
        </div>
        <StatusBadge badge={localizeStatusBadge(visit.workflowBadge)} size="sm" />
      </div>
    </Link>
  );
}

function dedupeVisits(visits: VisitListItem[]): VisitListItem[] {
  const seen = new Set<string>();
  const result: VisitListItem[] = [];

  for (const visit of visits) {
    if (seen.has(visit.id)) continue;
    seen.add(visit.id);
    result.push(visit);
  }

  return result;
}

function getMetricToneClass(tone: "neutral" | "warning" | "success"): string {
  if (tone === "warning") return "border-amber-200 bg-amber-50 text-amber-900";
  if (tone === "success") return "border-emerald-200 bg-emerald-50 text-emerald-800";
  return "border-slate-200 bg-slate-50 text-slate-800";
}

function getDoctorStatusTone(status: ReceptionDoctorAvailability["status"]): string {
  if (status === "available") return "border-emerald-200 bg-emerald-50 text-emerald-800";
  if (status === "busy") return "border-amber-200 bg-amber-50 text-amber-900";
  if (status === "unavailable") return "border-red-200 bg-red-50 text-red-800";
  return "border-slate-200 bg-slate-100 text-slate-600";
}

function formatDoctorStatus(status: ReceptionDoctorAvailability["status"]): string {
  if (status === "available") return "Mavjud";
  if (status === "busy") return "Band";
  if (status === "unavailable") return "Mavjud emas";
  return "Smenada emas";
}

function formatMinutes(value?: number): string {
  if (typeof value !== "number") return "Yo‘q";
  if (value < 60) return `${value} daq`;
  const hours = Math.floor(value / 60);
  const minutes = value % 60;
  return minutes ? `${hours} soat ${minutes} daq` : `${hours} soat`;
}

function formatPriority(priority?: ReceptionQueueItem["priority"]): string {
  if (priority === "emergency") return "Shoshilinch";
  if (priority === "urgent") return "Tezkor";
  if (priority === "vip") return "VIP";
  return "Oddiy";
}

function formatSla(state?: ReceptionQueueItem["slaState"]): string {
  if (state === "breached") return "Buzilgan";
  if (state === "warning") return "Ogoh";
  return "Normal";
}

function formatOwnerRole(role?: string | null): string {
  if (role === "doctor") return "Shifokor";
  if (role === "cashier") return "Kassa";
  if (role === "lab_operator") return "Laboratoriya";
  if (role === "radiology_operator") return "Radiologiya";
  if (role === "receptionist") return "Qabulxona";
  return "Mas’ul yo‘q";
}

function localizeBottleneck(value: string): string {
  const labels: Record<string, string> = {
    "Cardiology queue exceeds 30 minutes.": "Kardiologiya navbati 30 daqiqadan oshgan.",
    "Two paid visits are not closed.": "Ikkita to‘langan tashrif hali yopilmagan.",
    "Lab pending cases need ownership confirmation.": "Laboratoriya kutayotgan holatlar uchun mas’ul tasdiqlanishi kerak.",
  };
  return labels[value] ?? value;
}

function localizeSummaryItem<T extends { label: string }>(item: T): T {
  return { ...item, label: localizeText(item.label) };
}

function localizeStatusBadge(badge: StatusBadgeData): StatusBadgeData {
  return { ...badge, label: localizeText(badge.label) };
}

function localizeAction(action: NextActionData): NextActionData {
  return {
    ...action,
    label: localizeText(action.label),
    cta: localizeText(action.cta),
    reason: action.reason ? localizeText(action.reason) : undefined,
  };
}

function localizeText(value: string): string {
  const labels: Record<string, string> = {
    "Needs action": "Harakat kerak",
    "In progress": "Jarayonda",
    "Billing / closing": "To‘lov / yakunlash",
    "Closed today": "Bugun yopilgan",
    Delayed: "Kechikkan",
    Scheduled: "Rejalashtirilgan",
    Confirmed: "Tasdiqlangan",
    Arrived: "Kelgan",
    "Checked in": "Check-in qilingan",
    "Converted to visit": "Tashrifga aylantirilgan",
    "No show": "Kelmadi",
    Cancelled: "Bekor qilingan",
    "Intake created": "Qabul yaratildi",
    "Doctor assigned": "Shifokor biriktirildi",
    "Queued for doctor": "Shifokor navbatida",
    "With doctor": "Shifokorda",
    "Awaiting lab": "Laboratoriya kutmoqda",
    "Lab in progress": "Laboratoriya jarayonda",
    "Awaiting radiology": "Radiologiya kutmoqda",
    "Radiology in progress": "Radiologiya jarayonda",
    "Awaiting procedure": "Muolaja kutmoqda",
    "Procedure in progress": "Muolaja jarayonda",
    "Awaiting doctor review": "Shifokor ko‘rigi kutmoqda",
    "Consultation completed": "Konsultatsiya tugadi",
    "Billing pending": "To‘lov kutilmoqda",
    "Partially paid": "Qisman to‘langan",
    Paid: "To‘langan",
    Completed: "Yakunlangan",
    "Assign doctor": "Shifokor biriktirish",
    "Queue patient": "Bemorni navbatga qo‘yish",
    "Open visit": "Tashrifni ochish",
    "Check status": "Holatni tekshirish",
    "Issue invoice": "Hisob chiqarish",
    "Record payment": "To‘lov kiritish",
    "Collect remaining": "Qolgan to‘lovni olish",
    "Complete visit": "Tashrifni yakunlash",
    View: "Ko‘rish",
    Open: "Ochish",
    "No action needed": "Harakat kerak emas",
    "View only": "Faqat ko‘rish",
    "Draft invoice": "Hisob qoralamasi",
    Issued: "Chiqarilgan",
    "No invoice": "Hisob yo‘q",
  };

  return labels[value] ?? value;
}

function formatInvoiceSignal(visit: VisitListItem): string {
  if (visit.invoiceBadge?.label) return visit.invoiceBadge.label;
  if (visit.invoiceStatus) return visit.invoiceStatus.replaceAll("_", " ");
  return "Hisob yo‘q";
}

function formatPatientSubtitle(visit: VisitListItem): string {
  const parts = [
    visit.patient.patientCode,
    visit.patient.age ? `${visit.patient.age} yosh` : null,
    formatGender(visit.patient.gender),
    visit.patient.phone,
  ].filter(Boolean);

  return parts.join(" / ");
}

function formatGender(gender: VisitListItem["patient"]["gender"]): string | null {
  if (gender === "male") return "Erkak";
  if (gender === "female") return "Ayol";
  if (gender === "other") return "Boshqa";
  return null;
}

function formatVisitContext(visit: VisitListItem): string {
  const parts = [
    visit.department?.name,
    visit.doctor?.fullName ?? "Shifokor biriktirilmagan",
    visit.reason,
  ].filter(Boolean);

  return parts.join(" / ");
}

function resolveActionHref(action: NextActionData, visit: VisitListItem): string {
  if (!action.targetRoute) return `/app/visits/${visit.id}`;

  if (action.targetRoute.includes("/invoices/[id]")) {
    return `/app/visits/${visit.id}`;
  }

  return action.targetRoute.replace("[id]", visit.id);
}

function formatTime(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("uz-UZ", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatElapsed(value: string): string {
  const date = new Date(value);
  const timestamp = date.getTime();

  if (Number.isNaN(timestamp)) return "noma’lum";

  const minutes = Math.max(0, Math.round((Date.now() - timestamp) / 60000));

  if (minutes < 1) return "hozir";
  if (minutes < 60) return `${minutes}m`;

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours < 24) {
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  }

  const days = Math.floor(hours / 24);
  return `${days}d`;
}
