import type { ID, NextActionData, PatientSummary, StatusBadgeData } from "./shared";

export type ProcedureOrderStatus =
  | "ordered"
  | "scheduled"
  | "ready"
  | "in_progress"
  | "completed"
  | "reviewed_by_doctor"
  | "cancelled";

export type ProcedureOrderSummary = {
  id: ID;
  procedureOrderCode: string;
  visitId: ID;
  patient: PatientSummary;
  procedureName: string;
  status: ProcedureOrderStatus;
  statusBadge: StatusBadgeData;
  nextAction: NextActionData;
  scheduledAt?: string | null;
  createdAt: string;
};
