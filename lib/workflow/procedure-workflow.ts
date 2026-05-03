import type { ProcedureOrderStatus, ProcedureOrderSummary } from "../types/procedures";
import type { NextActionData, StatusBadgeData } from "../types/shared";

type Role = "nurse" | "procedure_operator" | "doctor" | "admin" | "operations_manager" | string;

const procedureStatusMap: Record<
  ProcedureOrderStatus,
  { label: string; tone: StatusBadgeData["tone"]; action: NextActionData }
> = {
  ordered: { label: "Ordered", tone: "neutral", action: { label: "Schedule or prepare", cta: "Open" } },
  scheduled: { label: "Scheduled", tone: "info", action: { label: "Prepare patient", cta: "Prepare" } },
  ready: { label: "Ready", tone: "warning", action: { label: "Start procedure", cta: "Start" } },
  in_progress: { label: "In progress", tone: "accent", action: { label: "Complete procedure", cta: "Complete" } },
  completed: { label: "Completed", tone: "success", action: { label: "Review if needed", cta: "View" } },
  reviewed_by_doctor: { label: "Reviewed", tone: "success", action: { label: "No action", cta: "View", disabled: true } },
  cancelled: { label: "Cancelled", tone: "danger", action: { label: "No action", cta: "View", disabled: true } },
};

export function getProcedureStatusLabel(status: ProcedureOrderStatus | string): string {
  return procedureStatusMap[status as ProcedureOrderStatus]?.label ?? "Unknown status";
}

export function getProcedureStatusTone(status: ProcedureOrderStatus | string): StatusBadgeData["tone"] {
  return procedureStatusMap[status as ProcedureOrderStatus]?.tone ?? "neutral";
}

export function getProcedureStatusBadge(status: ProcedureOrderStatus | string): StatusBadgeData {
  return { label: getProcedureStatusLabel(status), tone: getProcedureStatusTone(status) };
}

export function getProcedureNextAction(order: ProcedureOrderSummary, role: Role): NextActionData {
  const meta = procedureStatusMap[order.status];
  if (!meta) return viewProcedureOrder(order.id);
  if (isProcedureTerminalStatus(order.status)) return { ...viewProcedureOrder(order.id), label: "No action" };

  const procedureRoles = ["nurse", "procedure_operator", "operations_manager", "admin"];
  if (procedureRoles.includes(role) && ["ordered", "scheduled", "ready", "in_progress"].includes(order.status)) {
    return { ...meta.action, targetRoute: `/app/procedures/orders/${order.id}` };
  }
  if ((role === "doctor" || role === "admin") && order.status === "completed") {
    return { label: "Review if needed", cta: "View", targetRoute: `/app/procedures/orders/${order.id}` };
  }
  return viewProcedureOrder(order.id);
}

export function getAllowedProcedureActions(order: ProcedureOrderSummary, role: Role): NextActionData[] {
  const actions = [getProcedureNextAction(order, role), viewProcedureOrder(order.id)];
  if (!isProcedureTerminalStatus(order.status) && role === "admin") {
    actions.push({ label: "Cancel order", cta: "Cancel", targetRoute: `/app/procedures/orders/${order.id}` });
  }
  return dedupeActions(actions);
}

export function isProcedureTerminalStatus(status: ProcedureOrderStatus | string): boolean {
  return status === "reviewed_by_doctor" || status === "cancelled";
}

function viewProcedureOrder(id?: string): NextActionData {
  return { label: "View", cta: "View", targetRoute: id ? `/app/procedures/orders/${id}` : undefined };
}

function dedupeActions(actions: NextActionData[]): NextActionData[] {
  return actions.filter((action, index, list) => list.findIndex((item) => item.cta === action.cta) === index);
}
