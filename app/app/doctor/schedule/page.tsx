import { WorkbenchListCard } from "@/components/workbench/workbench-list-card";
import { WorkbenchRowLimit } from "@/components/workbench/workbench-row-limit";
import { WorkbenchTableHeader, WorkbenchTableRow } from "@/components/workbench/workbench-table-row";
import { getDoctorModuleWorkspace } from "@/lib/api/client";
import type { DoctorScheduleItem } from "@/lib/types/doctor";

export default async function DoctorScheduleRoutePage() {
  const workspace = await getDoctorModuleWorkspace();
  const items = expandScheduleItems(workspace.rightRail.todaySchedule, 24);

  return (
    <div className="space-y-3">
      <PageNote text="Bu sahifa shifokorning bugungi jadvali uchun: appointment va xona holati ko'rinadi, kelgan bemor bo'lsa tashrif yoki konsultatsiyani ochish mumkin." />
      <WorkbenchListCard
        title="Doctor jadvali"
        summary={`${items.length} bugungi appointment / avval 12 qator ko'rinadi`}
        selectedKey="today"
        selector={[{ key: "today", label: "Bugun", count: items.length, href: "/app/doctor/schedule" }]}
        filters={["Vaqt", "Xona", "Kelgan", "Bekor"]}
        fullListHref="/app/doctor"
        fullListLabel="Ish stoli"
        searchPlaceholder="Jadval ichida qidirish..."
      >
        <WorkbenchTableHeader />
        <WorkbenchRowLimit initialCount={12}>
          {items.map((item) => <ScheduleRow item={item} key={item.id} />)}
        </WorkbenchRowLimit>
      </WorkbenchListCard>
    </div>
  );
}

function ScheduleRow({ item }: { item: DoctorScheduleItem }) {
  const appointment = item.appointment;
  return (
    <WorkbenchTableRow
      title={appointment.patient.fullName}
      subtitle={[appointment.patient.patientCode, appointment.patient.phone].filter(Boolean).join(" / ")}
      href={appointment.nextAction.targetRoute ?? "/app/doctor/schedule"}
      reference={`${formatTime(appointment.scheduledStart)} / ${appointment.appointmentCode}`}
      context={[appointment.department.name, item.room, appointment.doctor.fullName].filter(Boolean).join(" / ")}
      primaryBadge={{ ...appointment.statusBadge, label: localizeStatus(appointment.statusBadge.label) }}
      secondaryBadge={{ label: availabilityLabel(item.availabilityStatus), tone: item.availabilityStatus === "busy" ? "warning" : "neutral" }}
      signals={[formatTime(appointment.scheduledStart), item.room ?? "Xona yo'q", appointment.doctor.fullName]}
      nextAction={localizeAction(appointment.nextAction.label)}
      primaryAction={{ label: localizeAction(appointment.nextAction.cta), href: appointment.nextAction.targetRoute }}
      secondaryActions={[{ label: "Appointment", href: `/app/appointments/${appointment.id}`, variant: "secondary" }]}
    />
  );
}
function PageNote({ text }: { text: string }) { return <div className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm leading-5 text-slate-600">{text}</div>; }
function formatTime(value: string): string { const date = new Date(value); return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("uz-UZ", { hour: "2-digit", minute: "2-digit" }).format(date); }
function availabilityLabel(value: DoctorScheduleItem["availabilityStatus"]): string { return ({ available: "Bo'sh", busy: "Band", break: "Tanaffus", cancelled: "Bekor", no_show: "No-show" } as Record<DoctorScheduleItem["availabilityStatus"], string>)[value]; }
function localizeStatus(value?: string): string { return ({ Arrived: "Kelgan", Confirmed: "Tasdiq", Scheduled: "Reja", "Checked in": "Check-in", Cancelled: "Bekor", "No-show": "No-show" } as Record<string, string>)[value ?? ""] ?? value ?? ""; }
function localizeAction(value?: string): string { return ({ Open: "Ochish", "Open appointment": "Qabulni ochish" } as Record<string, string>)[value ?? ""] ?? value ?? ""; }
function expandScheduleItems(items: DoctorScheduleItem[], target: number): DoctorScheduleItem[] {
  if (!items.length) return [];
  return Array.from({ length: target }, (_, index) => {
    const item = items[index % items.length];
    const status = (["confirmed", "arrived", "checked_in", "cancelled", "no_show"] as const)[index % 5];
    const availabilityStatus = (["available", "busy", "break", "cancelled", "no_show"] as const)[index % 5];
    return {
      ...item,
      id: `${item.id}-demo-${index + 1}`,
      availabilityStatus,
      room: `Xona ${201 + (index % 8)}`,
      appointment: {
        ...item.appointment,
        id: `${item.appointment.id}-demo-${index + 1}`,
        appointmentCode: `A-2026-D${String(index + 1).padStart(3, "0")}`,
        status,
        statusBadge: {
          label: status === "arrived" ? "Arrived" : status === "confirmed" ? "Confirmed" : status === "checked_in" ? "Checked in" : status === "cancelled" ? "Cancelled" : "No-show",
          tone: status === "arrived" || status === "checked_in" ? "accent" : status === "cancelled" || status === "no_show" ? "danger" : "neutral",
        },
      },
    };
  });
}
