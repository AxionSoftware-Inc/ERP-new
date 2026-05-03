import type { ProcedureOrderStatus, ProcedureOrderSummary } from "../types/procedures";
import { getProcedureNextAction, getProcedureStatusBadge } from "../workflow/procedure-workflow";
import { mockPatients } from "./patients";
import { daysAgo } from "./shared";

const procedureStatuses: ProcedureOrderStatus[] = ["ordered", "scheduled", "ready", "in_progress", "completed", "reviewed_by_doctor"];

export const mockProcedureOrderSummaries: ProcedureOrderSummary[] = procedureStatuses.map((status, index) => {
  const order = {
    id: `proc-${String(index + 1).padStart(3, "0")}`,
    procedureOrderCode: `PR-2026-${String(index + 1).padStart(4, "0")}`,
    visitId: `visit-${String(index + 8).padStart(3, "0")}`,
    patient: mockPatients[(index + 1) % mockPatients.length],
    procedureName: ["Injection therapy", "ECG", "Nebulizer", "Physiotherapy", "Wound dressing", "Blood pressure monitoring"][index],
    status,
    statusBadge: getProcedureStatusBadge(status),
    nextAction: { label: "View", cta: "View" },
    scheduledAt: daysAgo(index % 2, 10 + index),
    createdAt: daysAgo(1 + index),
  } satisfies ProcedureOrderSummary;
  return { ...order, nextAction: getProcedureNextAction(order, "nurse") };
});

export function getMockProcedureOrderSummariesByVisitId(visitId: string): ProcedureOrderSummary[] {
  return mockProcedureOrderSummaries.filter((order) => order.visitId === visitId);
}
