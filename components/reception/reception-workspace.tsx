import Link from "next/link";
import { getReceptionWorkspace } from "@/lib/api/client";
import { mockBranches } from "@/lib/mock/shared";
import type { AppointmentListItem } from "@/lib/types/appointments";
import type { PatientListItem } from "@/lib/types/patients";
import type { NextActionData } from "@/lib/types/shared";
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

export async function ReceptionWorkspace() {
  const workspace = await getReceptionWorkspace();
  const priorityVisits = dedupeVisits([
    ...workspace.queues.needsAction.items,
    ...workspace.queues.billingAndClosing.items,
    ...workspace.rightPanel.delayedCases,
  ]).slice(0, 3);

  return (
    <div className="space-y-3">
      <WorkspaceHeader
        title="Reception Workspace"
        subtitle="Manage intake, doctor assignment, and patient flow for today."
        branch={mockBranches[0]}
        meta={[{ label: "Date", value: "Today" }]}
        primaryAction={{ label: "New intake", href: "/app/reception/intake/new" }}
      />

      <SummaryStrip items={workspace.summary} />

      <section className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_360px]">
        <main className="min-w-0 space-y-3">
          <OperatorFocusPanel visits={priorityVisits} />

          <QueueSection
            title="Needs action"
            description="Visits that need reception action now."
            count={workspace.queues.needsAction.count}
            items={workspace.queues.needsAction.items}
            renderItem={(visit) => <ReceptionVisitRow visit={visit} />}
            emptyTitle="No reception actions waiting."
            emptyDescription="New intake, doctor assignment, and queue actions are clear."
          />

          <QueueSection
            title="In progress"
            description="Visits currently moving through doctor, lab, radiology, or review."
            count={workspace.queues.inProgress.count}
            items={workspace.queues.inProgress.items}
            renderItem={(visit) => <ReceptionVisitRow visit={visit} />}
            emptyTitle="No active in-progress visits."
            emptyDescription="Clinical workflow visits will appear here when they are active."
          />

          <QueueSection
            title="Billing / closing"
            description="Visits waiting for billing, payment, or final closure."
            count={workspace.queues.billingAndClosing.count}
            items={workspace.queues.billingAndClosing.items}
            renderItem={(visit) => <ReceptionVisitRow visit={visit} />}
            emptyTitle="No visits waiting for billing or closing."
            emptyDescription="Cashier and closing handoffs are clear for now."
          />

          <QueueSection
            title="Closed today"
            description="Visits completed or cancelled today."
            count={workspace.queues.closedToday.count}
            items={workspace.queues.closedToday.items}
            renderItem={(visit) => <ReceptionVisitRow visit={visit} />}
            emptyTitle="No closed visits yet today."
            emptyDescription="Completed or cancelled visits will appear here."
            maxVisibleItems={4}
            viewAllHref="/app/visits"
          />
        </main>

        <WorkspaceRightPanel sections={buildRightPanelSections(workspace.rightPanel)} />
      </section>
    </div>
  );
}

function OperatorFocusPanel({ visits }: { visits: VisitListItem[] }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 bg-slate-50/60 px-3 py-2.5">
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-slate-950">Operator focus</h2>
          <p className="mt-0.5 text-xs leading-5 text-slate-500">
            Priority intake, billing, and delayed cases to clear first.
          </p>
        </div>
        <Link
          className="shrink-0 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50"
          href="/app/reception/queue"
        >
          Full queue
        </Link>
      </div>

      {visits.length ? (
        <div className="grid gap-2 bg-slate-50/30 p-2 lg:grid-cols-3">
          {visits.map((visit) => (
            <Link
              className="group rounded-xl border border-slate-200 bg-white p-3 shadow-[0_1px_0_rgba(15,23,42,0.03)] transition-colors hover:border-teal-200 hover:bg-slate-50"
              href={resolveActionHref(visit.nextAction, visit)}
              key={visit.id}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-slate-950">
                    {visit.patient.fullName}
                  </div>
                  <div className="mt-0.5 truncate text-xs text-slate-500">
                    {visit.visitCode} - {visit.patient.phone ?? "No phone"}
                  </div>
                </div>
                <StatusBadge badge={visit.workflowBadge} size="sm" />
              </div>

              <div className="mt-3 rounded-lg bg-slate-50 px-2 py-1.5 text-xs text-slate-600 ring-1 ring-inset ring-slate-100">
                <span className="font-semibold text-slate-500">Next:</span>{" "}
                <span className="font-medium text-slate-900">{visit.nextAction.label}</span>
              </div>

              <div className="mt-3 inline-flex h-7 items-center rounded-lg bg-teal-700 px-2.5 text-xs font-semibold text-white group-hover:bg-teal-800">
                {visit.nextAction.cta || "Open visit"}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-slate-50/30 p-2">
          <div className="rounded-lg border border-dashed border-slate-200 bg-white px-3 py-4 text-sm text-slate-500">
            No priority reception cases right now.
          </div>
        </div>
      )}
    </section>
  );
}

function ReceptionVisitRow({ visit }: { visit: VisitListItem }) {
  return (
    <OperatorCaseRow
      identity={{
        title: visit.patient.fullName,
        subtitle: formatPatientSubtitle(visit),
        href: `/app/visits/${visit.id}`,
      }}
      reference={visit.visitCode}
      context={formatVisitContext(visit)}
      primaryBadge={visit.workflowBadge}
      secondaryBadge={visit.invoiceBadge ?? undefined}
      nextAction={visit.nextAction}
      primaryAction={{
        label: visit.nextAction.cta || "Open visit",
        href: resolveActionHref(visit.nextAction, visit),
      }}
      secondaryActions={[
        { label: "Open visit", href: `/app/visits/${visit.id}` },
        { label: "Patient profile", href: `/app/patients/${visit.patient.id}` },
      ]}
      meta={[
        { label: "Doctor", value: visit.doctor?.fullName ?? "Not assigned" },
        { label: "Department", value: visit.department?.name ?? "Not selected" },
      ]}
    />
  );
}

function buildRightPanelSections(rightPanel: {
  todayAppointments: AppointmentListItem[];
  recentRegistrations: PatientListItem[];
  delayedCases: VisitListItem[];
}): WorkspaceRightPanelSection[] {
  const waitingForDoctor = rightPanel.delayedCases.filter(
    (visit) => visit.workflowStatus === "queued_for_doctor",
  ).length;
  const billingWaiting = rightPanel.delayedCases.filter(
    (visit) => visit.workflowStatus === "billing_pending" || visit.workflowStatus === "partially_paid",
  ).length;

  return [
    {
      title: "Fast patient search",
      items: [
        <div className="space-y-2.5" key="patient-search">
          <input
            className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-teal-300 focus:bg-white"
            placeholder="Name, phone, or patient code"
            type="search"
          />
          <p className="text-xs leading-5 text-slate-500">Search by name, phone, or patient code.</p>
          <div className="grid grid-cols-2 gap-2">
            <Link
              className="inline-flex h-8 items-center justify-center rounded-lg border border-slate-200 bg-white px-2 text-xs font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50"
              href="/app/patients/new"
            >
              New patient
            </Link>
            <Link
              className="inline-flex h-8 items-center justify-center rounded-lg border border-teal-700 bg-teal-700 px-2 text-xs font-semibold text-white hover:bg-teal-800"
              href="/app/reception/intake/new"
            >
              New intake
            </Link>
          </div>
        </div>,
      ],
    },
    {
      title: "Today's appointments",
      items: rightPanel.todayAppointments.slice(0, 5).map((appointment) => (
        <AppointmentLine appointment={appointment} key={appointment.id} />
      )),
      emptyTitle: "No appointments scheduled today.",
      emptyDescription: "Scheduled appointments will appear here.",
    },
    {
      title: "Reception control",
      items: [
        <ControlMetric
          href="/app/reception/queue"
          key="waiting-for-doctor"
          label="Waiting for doctor"
          value={waitingForDoctor}
          tone="warning"
        />,
        <ControlMetric
          href="/app/cashier"
          key="billing-waiting"
          label="Billing waiting"
          value={billingWaiting}
          tone="success"
        />,
        <ControlMetric
          href="/app/reception/patient-search"
          key="recent-registrations"
          label="Recent registrations"
          value={rightPanel.recentRegistrations.length}
          tone="neutral"
        />,
      ],
    },
    {
      title: "Delayed cases",
      items: rightPanel.delayedCases.slice(0, 5).map((visit) => (
        <DelayedVisitLine visit={visit} key={visit.id} />
      )),
      emptyTitle: "No delayed cases.",
      emptyDescription: "Visits that exceed expected waiting time will appear here.",
    },
    {
      title: "Recent registrations",
      items: rightPanel.recentRegistrations.slice(0, 5).map((patient) => (
        <PatientLine patient={patient} key={patient.id} />
      )),
      emptyTitle: "No recent registrations.",
      emptyDescription: "Newly registered patients will appear here.",
    },
  ];
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
            {formatTime(appointment.scheduledStart)} - {appointment.doctor.fullName}
          </div>
        </div>
        <StatusBadge badge={appointment.statusBadge} size="sm" />
      </div>
    </Link>
  );
}

function PatientLine({ patient }: { patient: PatientListItem }) {
  return (
    <Link className="block min-w-0 hover:text-teal-700" href={`/app/patients/${patient.id}`}>
      <div className="truncate text-sm font-semibold text-slate-950">{patient.fullName}</div>
      <div className="mt-0.5 truncate text-xs text-slate-600">
        {patient.patientCode} - {patient.phone ?? "No phone"}
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

function DelayedVisitLine({ visit }: { visit: VisitListItem }) {
  return (
    <Link className="block min-w-0 hover:text-teal-700" href={`/app/visits/${visit.id}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-slate-950">
            {visit.patient.fullName}
          </div>
          <div className="mt-0.5 truncate text-xs text-slate-600">
            {visit.visitCode} - {visit.nextAction.label}
          </div>
        </div>
        <StatusBadge badge={visit.workflowBadge} size="sm" />
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

function formatPatientSubtitle(visit: VisitListItem): string {
  const parts = [
    visit.patient.patientCode,
    visit.patient.age ? `${visit.patient.age} yosh` : null,
    formatGender(visit.patient.gender),
    visit.patient.phone,
  ].filter(Boolean);

  return parts.join(" - ");
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
    visit.doctor?.fullName ?? "Doctor not assigned",
    visit.reason,
  ].filter(Boolean);

  return parts.join(" - ");
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
