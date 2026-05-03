import type { Appointment, AppointmentListItem, AppointmentStatus } from "../types/appointments";
import type { NextActionData, StatusBadgeData } from "../types/shared";

type AppointmentLike = Pick<Appointment | AppointmentListItem, "id" | "status"> & {
  linkedVisitId?: string | null;
};

const appointmentStatusMap: Record<
  AppointmentStatus,
  { label: string; tone: StatusBadgeData["tone"]; action: NextActionData }
> = {
  scheduled: { label: "Scheduled", tone: "info", action: { label: "Confirm appointment", cta: "Confirm" } },
  confirmed: { label: "Confirmed", tone: "success", action: { label: "Wait for arrival", cta: "Check in" } },
  arrived: { label: "Arrived", tone: "warning", action: { label: "Check in patient", cta: "Check in" } },
  checked_in: { label: "Checked in", tone: "accent", action: { label: "Convert to visit", cta: "Create visit" } },
  converted_to_visit: {
    label: "Converted to visit",
    tone: "success",
    action: { label: "Open visit", cta: "Open visit" },
  },
  no_show: { label: "No-show", tone: "danger", action: { label: "No action", cta: "View", disabled: true } },
  cancelled: { label: "Cancelled", tone: "danger", action: { label: "No action", cta: "View", disabled: true } },
};

export function getAppointmentStatusLabel(status: AppointmentStatus | string): string {
  return appointmentStatusMap[status as AppointmentStatus]?.label ?? "Unknown status";
}

export function getAppointmentStatusTone(status: AppointmentStatus | string): StatusBadgeData["tone"] {
  return appointmentStatusMap[status as AppointmentStatus]?.tone ?? "neutral";
}

export function getAppointmentStatusBadge(status: AppointmentStatus | string): StatusBadgeData {
  return {
    label: getAppointmentStatusLabel(status),
    tone: getAppointmentStatusTone(status),
  };
}

export function getAppointmentNextAction(appointment: AppointmentLike): NextActionData {
  const meta = appointmentStatusMap[appointment.status];
  if (!meta) return viewAppointment(appointment.id);
  if (appointment.status === "converted_to_visit" && appointment.linkedVisitId) {
    return { label: "Open visit", cta: "Open visit", targetRoute: `/app/visits/${appointment.linkedVisitId}` };
  }
  if (isAppointmentTerminalStatus(appointment.status)) {
    return { ...viewAppointment(appointment.id), label: "No action" };
  }
  return { ...meta.action, targetRoute: `/app/appointments/${appointment.id}` };
}

export function isAppointmentTerminalStatus(status: AppointmentStatus | string): boolean {
  return status === "no_show" || status === "cancelled";
}

function viewAppointment(id?: string): NextActionData {
  return { label: "View", cta: "View", targetRoute: id ? `/app/appointments/${id}` : undefined };
}
