import type { Consultation, ConsultationStatus } from "../types/clinical";
import type { NextActionData, StatusBadgeData } from "../types/shared";

const consultationStatusMap: Record<
  ConsultationStatus,
  { label: string; tone: StatusBadgeData["tone"]; action: NextActionData }
> = {
  not_started: { label: "Not started", tone: "neutral", action: { label: "Start consultation", cta: "Start" } },
  in_progress: { label: "In progress", tone: "accent", action: { label: "Continue consultation", cta: "Continue" } },
  waiting_for_results: { label: "Waiting for results", tone: "warning", action: { label: "Wait for results", cta: "View" } },
  reviewing_results: { label: "Reviewing results", tone: "warning", action: { label: "Review and decide", cta: "Review" } },
  completed: { label: "Completed", tone: "success", action: { label: "No action", cta: "View", disabled: true } },
  cancelled: { label: "Cancelled", tone: "danger", action: { label: "No action", cta: "View", disabled: true } },
};

export function getConsultationStatusLabel(status: ConsultationStatus | string): string {
  return consultationStatusMap[status as ConsultationStatus]?.label ?? "Unknown status";
}

export function getConsultationStatusTone(status: ConsultationStatus | string): StatusBadgeData["tone"] {
  return consultationStatusMap[status as ConsultationStatus]?.tone ?? "neutral";
}

export function getConsultationStatusBadge(status: ConsultationStatus | string): StatusBadgeData {
  return {
    label: getConsultationStatusLabel(status),
    tone: getConsultationStatusTone(status),
  };
}

export function getConsultationNextAction(consultation: Pick<Consultation, "id" | "visitId" | "status">): NextActionData {
  const meta = consultationStatusMap[consultation.status];
  if (!meta) return { label: "View", cta: "View", targetRoute: `/app/doctor/visits/${consultation.visitId}` };
  if (isConsultationTerminalStatus(consultation.status)) {
    return { label: "No action", cta: "View", targetRoute: `/app/doctor/visits/${consultation.visitId}`, disabled: true };
  }
  return { ...meta.action, targetRoute: `/app/doctor/visits/${consultation.visitId}` };
}

export function isConsultationTerminalStatus(status: ConsultationStatus | string): boolean {
  return status === "completed" || status === "cancelled";
}
