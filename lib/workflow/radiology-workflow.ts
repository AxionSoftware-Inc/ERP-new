import type { RadiologyOrder, RadiologyOrderStatus, RadiologyOrderSummary } from "../types/radiology";
import type { NextActionData, StatusBadgeData } from "../types/shared";

type RadiologyOrderLike = Pick<RadiologyOrder | RadiologyOrderSummary, "id" | "status">;
type Role = "radiology_operator" | "radiologist" | "doctor" | "admin" | string;

const radiologyStatusMap: Record<
  RadiologyOrderStatus,
  { label: string; tone: StatusBadgeData["tone"]; action: NextActionData }
> = {
  ordered: { label: "Ordered", tone: "neutral", action: { label: "Schedule or start", cta: "Open" } },
  scheduled: { label: "Scheduled", tone: "info", action: { label: "Mark patient arrived", cta: "Mark arrived" } },
  patient_arrived: { label: "Patient arrived", tone: "warning", action: { label: "Start imaging", cta: "Start imaging" } },
  imaging_in_progress: { label: "Imaging in progress", tone: "accent", action: { label: "Capture images", cta: "Continue" } },
  image_captured: { label: "Image captured", tone: "info", action: { label: "Draft report", cta: "Draft report" } },
  report_drafted: { label: "Report drafted", tone: "warning", action: { label: "Verify report", cta: "Verify" } },
  report_verified: { label: "Report verified", tone: "success", action: { label: "Release report", cta: "Release" } },
  released: { label: "Released", tone: "success", action: { label: "Review result", cta: "View result" } },
  reviewed_by_doctor: { label: "Reviewed", tone: "success", action: { label: "No action", cta: "View", disabled: true } },
  cancelled: { label: "Cancelled", tone: "danger", action: { label: "No action", cta: "View", disabled: true } },
};

export function getRadiologyStatusLabel(status: RadiologyOrderStatus | string): string {
  return radiologyStatusMap[status as RadiologyOrderStatus]?.label ?? "Unknown status";
}

export function getRadiologyStatusTone(status: RadiologyOrderStatus | string): StatusBadgeData["tone"] {
  return radiologyStatusMap[status as RadiologyOrderStatus]?.tone ?? "neutral";
}

export function getRadiologyStatusBadge(status: RadiologyOrderStatus | string): StatusBadgeData {
  return { label: getRadiologyStatusLabel(status), tone: getRadiologyStatusTone(status) };
}

export function getRadiologyNextAction(order: RadiologyOrderLike, role: Role): NextActionData {
  const meta = radiologyStatusMap[order.status];
  if (!meta) return viewRadiologyOrder(order.id);
  if (isRadiologyTerminalStatus(order.status)) return { ...viewRadiologyOrder(order.id), label: "No action" };

  const operatorStatuses: RadiologyOrderStatus[] = [
    "ordered",
    "scheduled",
    "patient_arrived",
    "imaging_in_progress",
    "report_verified",
  ];
  const radiologistStatuses: RadiologyOrderStatus[] = ["image_captured", "report_drafted"];
  if ((role === "radiology_operator" || role === "admin") && operatorStatuses.includes(order.status)) {
    return { ...meta.action, targetRoute: `/app/radiology/orders/${order.id}` };
  }
  if ((role === "radiologist" || role === "admin") && radiologistStatuses.includes(order.status)) {
    return { ...meta.action, targetRoute: `/app/radiology/orders/${order.id}` };
  }
  if ((role === "doctor" || role === "admin") && order.status === "released") {
    return { label: "Review result", cta: "Review result", targetRoute: `/app/radiology/orders/${order.id}` };
  }
  return viewRadiologyOrder(order.id);
}

export function getAllowedRadiologyActions(order: RadiologyOrderLike, role: Role): NextActionData[] {
  const actions = [getRadiologyNextAction(order, role), viewRadiologyOrder(order.id)];
  if (!isRadiologyTerminalStatus(order.status) && role === "admin") {
    actions.push({ label: "Cancel order", cta: "Cancel", targetRoute: `/app/radiology/orders/${order.id}` });
  }
  return dedupeActions(actions);
}

export function isRadiologyTerminalStatus(status: RadiologyOrderStatus | string): boolean {
  return status === "reviewed_by_doctor" || status === "cancelled";
}

function viewRadiologyOrder(id?: string): NextActionData {
  return { label: "View", cta: "View", targetRoute: id ? `/app/radiology/orders/${id}` : undefined };
}

function dedupeActions(actions: NextActionData[]): NextActionData[] {
  return actions.filter((action, index, list) => list.findIndex((item) => item.cta === action.cta) === index);
}
