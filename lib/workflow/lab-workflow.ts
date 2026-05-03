import type { LabOrder, LabOrderStatus, LabOrderSummary } from "../types/lab";
import type { NextActionData, StatusBadgeData } from "../types/shared";

type LabOrderLike = Pick<LabOrder | LabOrderSummary, "id" | "status">;
type Role = "lab_operator" | "lab_verifier" | "doctor" | "admin" | string;

const labStatusMap: Record<LabOrderStatus, { label: string; tone: StatusBadgeData["tone"]; action: NextActionData }> = {
  ordered: { label: "Ordered", tone: "neutral", action: { label: "Prepare sample collection", cta: "Open" } },
  sample_pending: { label: "Sample pending", tone: "warning", action: { label: "Collect sample", cta: "Collect sample" } },
  sample_collected: { label: "Sample collected", tone: "info", action: { label: "Start processing", cta: "Start processing" } },
  in_progress: { label: "In progress", tone: "accent", action: { label: "Enter result", cta: "Enter result" } },
  result_entered: { label: "Result entered", tone: "warning", action: { label: "Verify result", cta: "Verify" } },
  verified: { label: "Verified", tone: "success", action: { label: "Release result", cta: "Release" } },
  released: { label: "Released", tone: "success", action: { label: "Review result", cta: "View result" } },
  reviewed_by_doctor: { label: "Reviewed", tone: "success", action: { label: "No action", cta: "View", disabled: true } },
  cancelled: { label: "Cancelled", tone: "danger", action: { label: "No action", cta: "View", disabled: true } },
};

export function getLabStatusLabel(status: LabOrderStatus | string): string {
  return labStatusMap[status as LabOrderStatus]?.label ?? "Unknown status";
}

export function getLabStatusTone(status: LabOrderStatus | string): StatusBadgeData["tone"] {
  return labStatusMap[status as LabOrderStatus]?.tone ?? "neutral";
}

export function getLabStatusBadge(status: LabOrderStatus | string): StatusBadgeData {
  return { label: getLabStatusLabel(status), tone: getLabStatusTone(status) };
}

export function getLabNextAction(order: LabOrderLike, role: Role): NextActionData {
  const meta = labStatusMap[order.status];
  if (!meta) return viewLabOrder(order.id);
  if (isLabTerminalStatus(order.status)) return { ...viewLabOrder(order.id), label: "No action" };

  const operatorStatuses: LabOrderStatus[] = ["ordered", "sample_pending", "sample_collected", "in_progress", "verified"];
  if ((role === "lab_operator" || role === "admin") && operatorStatuses.includes(order.status)) {
    return { ...meta.action, targetRoute: `/app/lab/orders/${order.id}` };
  }
  if ((role === "lab_verifier" || role === "admin") && order.status === "result_entered") {
    return { ...meta.action, targetRoute: `/app/lab/orders/${order.id}` };
  }
  if ((role === "doctor" || role === "admin") && order.status === "released") {
    return { label: "Review result", cta: "Review result", targetRoute: `/app/lab/orders/${order.id}` };
  }
  return viewLabOrder(order.id);
}

export function getAllowedLabActions(order: LabOrderLike, role: Role): NextActionData[] {
  const actions = [getLabNextAction(order, role), viewLabOrder(order.id)];
  if (!isLabTerminalStatus(order.status) && role === "admin") {
    actions.push({ label: "Cancel order", cta: "Cancel", targetRoute: `/app/lab/orders/${order.id}` });
  }
  return dedupeActions(actions);
}

export function isLabTerminalStatus(status: LabOrderStatus | string): boolean {
  return status === "reviewed_by_doctor" || status === "cancelled";
}

function viewLabOrder(id?: string): NextActionData {
  return { label: "View", cta: "View", targetRoute: id ? `/app/lab/orders/${id}` : undefined };
}

function dedupeActions(actions: NextActionData[]): NextActionData[] {
  return actions.filter((action, index, list) => list.findIndex((item) => item.cta === action.cta) === index);
}
