import Link from "next/link";
import { getDoctorWorkspace } from "@/lib/api/client";
import { mockBranches, mockDoctors } from "@/lib/mock/shared";
import type { AppointmentListItem } from "@/lib/types/appointments";
import type { LabResultSummary } from "@/lib/types/lab";
import type { VisitListItem } from "@/lib/types/visits";
import { OperatorCaseRow } from "@/components/workspace/operator-case-row";
import { QueueSection } from "@/components/workspace/queue-section";
import { SummaryStrip } from "@/components/workspace/summary-strip";
import { WorkspaceHeader } from "@/components/workspace/workspace-header";
import {
  WorkspaceRightPanel,
  type WorkspaceRightPanelSection,
} from "@/components/workspace/workspace-right-panel";
import { StatusBadge } from "@/components/status/status-badge";
import {
  formatAppointmentStatus,
  formatElapsed,
  formatPatientSubtitle,
  formatTime,
  formatVisitContext,
  localizeDoctorAction,
  localizeDoctorBadge,
  localizeDoctorSummaryLabel,
} from "@/components/doctor/doctor-format";

export async function DoctorWorkspace() {
  const workspace = await getDoctorWorkspace();
  const currentDoctor = mockDoctors[0];
  const activeCount =
    workspace.queues.myQueue.count +
    workspace.queues.activeEncounters.count +
    workspace.queues.needsReview.count;

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-slate-100/80 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
      <div className="space-y-3">
        <WorkspaceHeader
          title="Shifokor ish stoli"
          subtitle="Bugungi bemorlar navbati, faol konsultatsiyalar va natija review’larini boshqarish."
          branch={mockBranches[0]}
          department={currentDoctor.department}
          meta={[
            { label: "Shifokor", value: currentDoctor.fullName },
            { label: "Mutaxassislik", value: currentDoctor.specialization },
            { label: "Faol holatlar", value: String(activeCount) },
          ]}
          primaryAction={{ label: "Mening navbatim", href: "/app/doctor/queue" }}
        />

        <SummaryStrip items={workspace.summary.map((item) => ({ ...item, label: localizeDoctorSummaryLabel(item.label) }))} />

        <section className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_350px]">
          <main className="min-w-0 space-y-3">
            <DoctorFocusPanel visits={[...workspace.queues.myQueue.items, ...workspace.queues.needsReview.items].slice(0, 3)} />

            <QueueSection
              title="Mening navbatim"
              description="Shifokor ko‘rigini kutayotgan bemorlar."
              count={workspace.queues.myQueue.count}
              items={workspace.queues.myQueue.items}
              renderItem={(visit, index) => <DoctorVisitRow queueLabel="Navbat" queuePosition={index + 1} visit={visit} />}
              emptyTitle="Shifokor navbatida bemor yo‘q."
              emptyDescription="Yangi bemorlar qabulxona navbatga qo‘yganda shu yerda ko‘rinadi."
            />

            <QueueSection
              title="Faol qabul"
              description="Hozir shifokor qabulida yoki konsultatsiya jarayonida bo‘lgan bemorlar."
              count={workspace.queues.activeEncounters.count}
              items={workspace.queues.activeEncounters.items}
              renderItem={(visit, index) => <DoctorVisitRow queueLabel="Faol qabul" queuePosition={index + 1} visit={visit} />}
              emptyTitle="Faol konsultatsiya yo‘q."
              emptyDescription="Boshlangan qabul jarayonlari shu yerda chiqadi."
            />

            <QueueSection
              title="Review kerak"
              description="Laboratoriya, radiologiya yoki muolaja natijasidan keyin shifokor ko‘rishi kerak bo‘lgan holatlar."
              count={workspace.queues.needsReview.count}
              items={workspace.queues.needsReview.items}
              renderItem={(visit, index) => <DoctorVisitRow queueLabel="Review" queuePosition={index + 1} visit={visit} />}
              emptyTitle="Review kutayotgan holat yo‘q."
              emptyDescription="Natijalar chiqarilganda yoki bemor qayta ko‘rishga kelganda shu yerda chiqadi."
            />

            <QueueSection
              title="Bugun yakunlangan"
              description="Bugun konsultatsiyasi tugagan yoki tashrifi yopilgan bemorlar."
              count={workspace.queues.completedToday.count}
              items={workspace.queues.completedToday.items}
              renderItem={(visit, index) => <DoctorVisitRow queueLabel="Yakunlangan" queuePosition={index + 1} visit={visit} />}
              emptyTitle="Bugun yakunlangan konsultatsiya yo‘q."
              emptyDescription="Tugallangan qabul va review’lar shu yerda ko‘rinadi."
              maxVisibleItems={4}
              viewAllHref="/app/doctor/completed"
            />
          </main>

          <WorkspaceRightPanel sections={buildDoctorRightPanel(workspace.rightPanel)} />
        </section>
      </div>
    </div>
  );
}

function DoctorFocusPanel({ visits }: { visits: VisitListItem[] }) {
  return (
    <section className="overflow-hidden rounded-xl border border-indigo-200/80 bg-white shadow-[0_1px_2px_rgba(79,70,229,0.08)]">
      <div className="h-1 bg-indigo-500" />
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-indigo-200/70 bg-indigo-50/80 px-3 py-2">
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-slate-950">Shifokor e’tiborida</h2>
          <p className="mt-0.5 text-xs leading-5 text-indigo-900/70">
            Boshlash, davom ettirish yoki review qilish kerak bo‘lgan eng muhim holatlar.
          </p>
        </div>
        <Link
          className="shrink-0 rounded-lg border border-indigo-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-indigo-900 hover:border-indigo-300 hover:bg-indigo-50"
          href="/app/doctor/queue"
        >
          To‘liq navbat
        </Link>
      </div>

      {visits.length ? (
        <div className="grid gap-2 bg-indigo-50/25 p-2 lg:grid-cols-3">
          {visits.map((visit) => {
            const action = localizeDoctorAction(visit.nextAction);
            return (
              <Link
                className="group rounded-xl border border-indigo-100 bg-white p-2.5 shadow-[0_1px_1px_rgba(79,70,229,0.06)] ring-1 ring-white/70 transition-colors hover:border-indigo-200 hover:bg-indigo-50/35"
                href={`/app/doctor/visits/${visit.id}`}
                key={visit.id}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold leading-5 text-slate-950">{visit.patient.fullName}</div>
                    <div className="mt-0.5 truncate text-xs text-slate-500">{visit.visitCode} / {visit.patient.phone ?? "Telefon yo‘q"}</div>
                  </div>
                  <StatusBadge badge={localizeDoctorBadge(visit.workflowBadge)} size="sm" />
                </div>

                <div className="mt-2 rounded-lg border border-indigo-200 bg-indigo-50 px-2 py-1.5 text-xs text-indigo-950">
                  <span className="font-semibold text-indigo-700">Keyingi</span>
                  <span className="ml-1 font-medium">{action.label}</span>
                </div>

                <div className="mt-2 grid grid-cols-2 gap-1.5 text-[10.5px]">
                  <FocusMetric label="Sabab" value={visit.reason ?? "Kiritilmagan"} />
                  <FocusMetric label="Kutmoqda" value={formatElapsed(visit.updatedAt)} />
                </div>

                <div className="mt-2 flex items-center justify-between gap-2">
                  <span className="truncate text-[11px] font-medium text-slate-500">{visit.department?.name ?? "Bo‘lim yo‘q"}</span>
                  <span className="inline-flex h-7 shrink-0 items-center rounded-lg bg-indigo-700 px-2.5 text-xs font-semibold text-white shadow-[0_1px_2px_rgba(79,70,229,0.25)] group-hover:bg-indigo-800">
                    {action.cta || "Ochish"}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="bg-indigo-50/25 p-2">
          <div className="rounded-lg border border-dashed border-slate-200 bg-white px-3 py-4 text-sm text-slate-500">
            Hozir shifokor uchun ustuvor holat yo‘q.
          </div>
        </div>
      )}
    </section>
  );
}

function FocusMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-indigo-100 bg-white/80 px-1.5 py-1">
      <div className="font-semibold uppercase tracking-wide text-indigo-900/60">{label}</div>
      <div className="mt-0.5 truncate font-bold text-slate-900">{value}</div>
    </div>
  );
}

export function DoctorVisitRow({
  visit,
  queueLabel,
  queuePosition,
}: {
  visit: VisitListItem;
  queueLabel: string;
  queuePosition: number;
}) {
  const action = localizeDoctorAction(visit.nextAction);

  return (
    <OperatorCaseRow
      identity={{
        title: visit.patient.fullName,
        subtitle: formatPatientSubtitle(visit),
        href: `/app/patients/${visit.patient.id}`,
      }}
      reference={visit.visitCode}
      context={formatVisitContext(visit)}
      primaryBadge={localizeDoctorBadge(visit.workflowBadge)}
      secondaryBadge={visit.invoiceBadge ? localizeDoctorBadge(visit.invoiceBadge) : undefined}
      nextAction={action}
      primaryAction={{
        label: action.cta || "Tashrifni ochish",
        href: `/app/doctor/visits/${visit.id}`,
      }}
      secondaryActions={[
        { label: "Tashrif", href: `/app/visits/${visit.id}` },
        { label: "Bemor", href: `/app/patients/${visit.patient.id}` },
      ]}
      meta={[
        { label: "Navbat", value: `${queueLabel} #${queuePosition}` },
        { label: "Kutmoqda", value: formatElapsed(visit.updatedAt) },
        { label: "Bo‘lim", value: visit.department?.name ?? "Yo‘q" },
        { label: "Sabab", value: visit.reason ?? "Kiritilmagan" },
      ]}
    />
  );
}

function buildDoctorRightPanel(rightPanel: {
  todayAppointments: AppointmentListItem[];
  urgentCases: VisitListItem[];
  recentResults: LabResultSummary[];
}): WorkspaceRightPanelSection[] {
  return [
    {
      title: "Bugungi qabullar",
      items: rightPanel.todayAppointments.slice(0, 5).map((appointment) => (
        <AppointmentLine appointment={appointment} key={appointment.id} />
      )),
      emptyTitle: "Bugun qabul yo‘q.",
      emptyDescription: "Shifokorning bugungi qabullari shu yerda ko‘rinadi.",
    },
    {
      title: "Shoshilinch holatlar",
      items: rightPanel.urgentCases.slice(0, 5).map((visit) => (
        <UrgentVisitLine visit={visit} key={visit.id} />
      )),
      emptyTitle: "Shoshilinch holat yo‘q.",
      emptyDescription: "Review yoki tezkor ko‘rish kerak bo‘lgan bemorlar shu yerda chiqadi.",
    },
    {
      title: "Yangi natijalar",
      items: rightPanel.recentResults.slice(0, 5).map((result) => (
        <LabResultLine result={result} key={result.id} />
      )),
      emptyTitle: "Yangi natijalar yo‘q.",
      emptyDescription: "Chiqqan laboratoriya natijalari shu yerda ko‘rinadi.",
    },
    {
      title: "Tezkor bo‘limlar",
      items: [
        <ShortcutLink href="/app/doctor/queue" key="queue" label="Mening navbatim" />,
        <ShortcutLink href="/app/doctor/reviews" key="reviews" label="Review kerak" />,
        <ShortcutLink href="/app/visits" key="visits" label="Tashriflar" />,
      ],
    },
  ];
}

function AppointmentLine({ appointment }: { appointment: AppointmentListItem }) {
  return (
    <Link className="block min-w-0 hover:text-indigo-700" href={`/app/appointments/${appointment.id}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-slate-950">{appointment.patient.fullName}</div>
          <div className="mt-0.5 truncate text-xs text-slate-600">
            {formatTime(appointment.scheduledStart)} / {appointment.department.name}
          </div>
          <div className="mt-1 text-[10.5px] font-medium uppercase tracking-wide text-slate-400">
            {formatAppointmentStatus(appointment.status)}
          </div>
        </div>
        <StatusBadge badge={localizeDoctorBadge(appointment.statusBadge)} size="sm" />
      </div>
    </Link>
  );
}

function UrgentVisitLine({ visit }: { visit: VisitListItem }) {
  return (
    <Link className="block min-w-0 hover:text-indigo-700" href={`/app/doctor/visits/${visit.id}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-slate-950">{visit.patient.fullName}</div>
          <div className="mt-0.5 truncate text-xs text-slate-600">{visit.visitCode} / {visit.reason ?? "Sabab yo‘q"}</div>
          <div className="mt-1 text-[10.5px] font-medium uppercase tracking-wide text-amber-700">
            Kutmoqda {formatElapsed(visit.updatedAt)}
          </div>
        </div>
        <StatusBadge badge={localizeDoctorBadge(visit.workflowBadge)} size="sm" />
      </div>
    </Link>
  );
}

function LabResultLine({ result }: { result: LabResultSummary }) {
  return (
    <Link className="block min-w-0 hover:text-indigo-700" href={`/app/lab/orders/${result.id}`}>
      <div className="truncate text-sm font-semibold text-slate-950">{result.labOrderCode}</div>
      <div className="mt-0.5 truncate text-xs text-slate-600">{result.testNames.join(", ")}</div>
      <div className="mt-1">
        <StatusBadge badge={localizeDoctorBadge(result.statusBadge)} size="sm" />
      </div>
    </Link>
  );
}

function ShortcutLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      className="inline-flex h-8 w-full items-center justify-center rounded-lg border border-slate-200 bg-white px-2 text-xs font-semibold text-slate-700 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-800"
      href={href}
    >
      {label}
    </Link>
  );
}
