import type { NextActionData, StatusBadgeData } from "../types/shared";
import type { Visit, VisitListItem, VisitSummary, VisitWorkflowStatus } from "../types/visits";

type VisitLike = Pick<Visit | VisitListItem | VisitSummary, "id" | "workflowStatus">;
type Role =
  | "receptionist"
  | "doctor"
  | "lab_operator"
  | "radiology_operator"
  | "cashier"
  | "admin"
  | "operations_manager"
  | string;

type VisitMeta = {
  label: string;
  tone: StatusBadgeData["tone"];
  action: NextActionData;
  owners: Role[];
};

const viewVisitAction = (id?: string): NextActionData => ({
  label: "View",
  cta: "View",
  targetRoute: id ? `/app/visits/${id}` : undefined,
});

const visitStatusMap: Record<VisitWorkflowStatus, VisitMeta> = {
  intake_created: {
    label: "Intake created",
    tone: "neutral",
    action: { label: "Assign doctor", cta: "Assign doctor" },
    owners: ["receptionist"],
  },
  doctor_assigned: {
    label: "Doctor assigned",
    tone: "info",
    action: { label: "Queue for doctor", cta: "Queue patient" },
    owners: ["receptionist"],
  },
  queued_for_doctor: {
    label: "Waiting for doctor",
    tone: "warning",
    action: { label: "Start consultation", cta: "Start consultation" },
    owners: ["doctor"],
  },
  with_doctor: {
    label: "With doctor",
    tone: "accent",
    action: { label: "Continue consultation", cta: "Continue consultation" },
    owners: ["doctor"],
  },
  awaiting_lab: {
    label: "Awaiting lab",
    tone: "warning",
    action: { label: "Collect sample", cta: "Collect sample" },
    owners: ["lab_operator"],
  },
  lab_in_progress: {
    label: "Lab in progress",
    tone: "accent",
    action: { label: "Enter or verify result", cta: "Open lab order" },
    owners: ["lab_operator"],
  },
  awaiting_radiology: {
    label: "Awaiting radiology",
    tone: "warning",
    action: { label: "Start diagnostic work", cta: "Open radiology order" },
    owners: ["radiology_operator"],
  },
  radiology_in_progress: {
    label: "Radiology in progress",
    tone: "accent",
    action: { label: "Complete report", cta: "Open radiology order" },
    owners: ["radiology_operator"],
  },
  awaiting_procedure: {
    label: "Awaiting procedure",
    tone: "warning",
    action: { label: "Perform procedure", cta: "Open procedure" },
    owners: ["operations_manager"],
  },
  procedure_in_progress: {
    label: "Procedure in progress",
    tone: "accent",
    action: { label: "Complete procedure", cta: "Complete procedure" },
    owners: ["operations_manager"],
  },
  awaiting_doctor_review: {
    label: "Awaiting doctor review",
    tone: "warning",
    action: { label: "Review results", cta: "Review result" },
    owners: ["doctor"],
  },
  consultation_completed: {
    label: "Consultation completed",
    tone: "success",
    action: { label: "Issue invoice", cta: "Issue invoice" },
    owners: ["cashier"],
  },
  billing_pending: {
    label: "Billing pending",
    tone: "warning",
    action: { label: "Record payment", cta: "Record payment" },
    owners: ["cashier"],
  },
  partially_paid: {
    label: "Partially paid",
    tone: "warning",
    action: { label: "Collect remaining payment", cta: "Collect remaining" },
    owners: ["cashier"],
  },
  paid: {
    label: "Paid",
    tone: "success",
    action: { label: "Complete visit", cta: "Complete visit" },
    owners: ["receptionist", "cashier"],
  },
  completed: {
    label: "Completed",
    tone: "success",
    action: { label: "No action", cta: "View", disabled: true },
    owners: [],
  },
  cancelled: {
    label: "Cancelled",
    tone: "danger",
    action: { label: "No action", cta: "View", disabled: true },
    owners: [],
  },
};

export function getVisitWorkflowLabel(status: VisitWorkflowStatus | string): string {
  return visitStatusMap[status as VisitWorkflowStatus]?.label ?? "Unknown status";
}

export function getVisitWorkflowTone(status: VisitWorkflowStatus | string): StatusBadgeData["tone"] {
  return visitStatusMap[status as VisitWorkflowStatus]?.tone ?? "neutral";
}

export function getVisitWorkflowBadge(status: VisitWorkflowStatus | string): StatusBadgeData {
  return {
    label: getVisitWorkflowLabel(status),
    tone: getVisitWorkflowTone(status),
  };
}

export function isVisitTerminalStatus(status: VisitWorkflowStatus | string): boolean {
  return status === "completed" || status === "cancelled";
}

export function getVisitNextActionForRole(visit: VisitLike, role: Role): NextActionData {
  const meta = visitStatusMap[visit.workflowStatus];
  if (!meta) return viewVisitAction(visit.id);
  if (isVisitTerminalStatus(visit.workflowStatus)) return { ...viewVisitAction(visit.id), label: "No action" };

  const targetRoute = getVisitTargetRoute(visit.workflowStatus, visit.id);
  if (meta.owners.includes(role) || role === "admin" || role === "operations_manager") {
    return { ...meta.action, targetRoute };
  }

  return {
    label: meta.label,
    cta: "Open",
    targetRoute: `/app/visits/${visit.id}`,
    reason: "Role can observe this workflow state.",
  };
}

export function getVisitPrimaryCTAForRole(visit: VisitLike, role: Role): string {
  return getVisitNextActionForRole(visit, role).cta;
}

export function getAllowedVisitActions(visit: VisitLike, role: Role): NextActionData[] {
  const primary = getVisitNextActionForRole(visit, role);
  const actions = [primary, viewVisitAction(visit.id)];
  if (!isVisitTerminalStatus(visit.workflowStatus) && (role === "admin" || role === "operations_manager")) {
    actions.push({
      label: "Cancel visit",
      cta: "Cancel",
      targetRoute: `/app/visits/${visit.id}`,
    });
  }
  return dedupeActions(actions);
}

function getVisitTargetRoute(status: VisitWorkflowStatus, id: string): string {
  if (status === "queued_for_doctor" || status === "with_doctor" || status === "awaiting_doctor_review") {
    return `/app/doctor/visits/${id}`;
  }
  if (status === "awaiting_lab" || status === "lab_in_progress") return `/app/lab/orders/${id}`;
  if (status === "awaiting_radiology" || status === "radiology_in_progress") {
    return `/app/radiology/orders/${id}`;
  }
  if (status === "awaiting_procedure" || status === "procedure_in_progress") {
    return `/app/procedures/orders/${id}`;
  }
  if (status === "consultation_completed" || status === "billing_pending" || status === "partially_paid") {
    return `/app/cashier/invoices/${id}`;
  }
  return `/app/visits/${id}`;
}

function dedupeActions(actions: NextActionData[]): NextActionData[] {
  return actions.filter((action, index, list) => list.findIndex((item) => item.cta === action.cta) === index);
}
