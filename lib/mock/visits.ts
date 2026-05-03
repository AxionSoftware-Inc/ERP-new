import type { TimelineEvent } from "../types/shared";
import type { Visit, VisitDetailResponse, VisitListItem, VisitWorkflowStatus } from "../types/visits";
import { getVisitNextActionForRole, getVisitWorkflowBadge } from "../workflow/visit-workflow";
import { getMockInvoiceSummaryByVisitId } from "./billing";
import { getMockConsultationByVisitId } from "./clinical";
import { getMockDocumentsForVisit } from "./documents";
import { getMockLabOrderSummariesByVisitId } from "./lab";
import { mockPatients } from "./patients";
import { getMockProcedureOrderSummariesByVisitId } from "./procedures";
import { getMockRadiologyOrderSummariesByVisitId } from "./radiology";
import { mockBranches, mockDepartments, mockDoctors, mockUsers, daysAgo, hoursAgo } from "./shared";

const visitStatuses: VisitWorkflowStatus[] = [
  "intake_created",
  "doctor_assigned",
  "queued_for_doctor",
  "with_doctor",
  "awaiting_lab",
  "lab_in_progress",
  "awaiting_radiology",
  "awaiting_doctor_review",
  "consultation_completed",
  "billing_pending",
  "partially_paid",
  "paid",
  "completed",
  "cancelled",
];

export const mockVisits: Visit[] = visitStatuses.map((workflowStatus, index) => {
  const id = `visit-${String(index + 1).padStart(3, "0")}`;
  const visit = {
    id,
    visitCode: `V-2026-${String(index + 1).padStart(4, "0")}`,
    patient: mockPatients[index % mockPatients.length],
    branch: mockBranches[0],
    department: mockDepartments[index % 4],
    doctor: mockDoctors[index % 4],
    reason: [
      "Birlamchi ko'rik",
      "Rejali qabul",
      "Bosh og'rig'i",
      "Lab natijasi",
      "Diagnostika yo'llanmasi",
    ][index % 5],
    visitType: index % 4 === 0 ? "walk_in" : index % 4 === 1 ? "appointment" : index % 4 === 2 ? "follow_up" : "emergency",
    workflowStatus,
    workflowBadge: getVisitWorkflowBadge(workflowStatus),
    nextAction: { label: "View", cta: "View" },
    appointmentId: index === 3 ? "appt-005" : null,
    createdBy: mockUsers[0],
    createdAt: index < 12 ? hoursAgo(index + 1) : daysAgo(index - 10),
    updatedAt: index < 12 ? hoursAgo(index) : daysAgo(index - 11),
  } satisfies Visit;
  return { ...visit, nextAction: getVisitNextActionForRole(visit, ownerRoleForStatus(workflowStatus)) };
});

export const mockVisitListItems: VisitListItem[] = mockVisits.map((visit) => {
  const invoice = getMockInvoiceSummaryByVisitId(visit.id);
  return {
    id: visit.id,
    visitCode: visit.visitCode,
    patient: visit.patient,
    doctor: visit.doctor,
    department: visit.department,
    reason: visit.reason,
    workflowStatus: visit.workflowStatus,
    workflowBadge: visit.workflowBadge,
    nextAction: visit.nextAction,
    invoiceStatus: invoice?.status ?? null,
    invoiceBadge: invoice?.statusBadge ?? null,
    createdAt: visit.createdAt,
    updatedAt: visit.updatedAt,
  };
});

export function getMockVisitById(id: string): Visit | undefined {
  return mockVisits.find((visit) => visit.id === id);
}

export function getMockVisitDetail(id: string): VisitDetailResponse | undefined {
  const visit = getMockVisitById(id);
  if (!visit) return undefined;
  return {
    visit,
    consultation: getMockConsultationByVisitId(id) ?? null,
    labOrders: getMockLabOrderSummariesByVisitId(id),
    radiologyOrders: getMockRadiologyOrderSummariesByVisitId(id),
    procedureOrders: getMockProcedureOrderSummariesByVisitId(id),
    invoice: getMockInvoiceSummaryByVisitId(id) ?? null,
    documents: getMockDocumentsForVisit(id),
    timeline: buildVisitTimeline(visit),
  };
}

function ownerRoleForStatus(status: VisitWorkflowStatus): string {
  if (status.includes("lab")) return "lab_operator";
  if (status.includes("radiology")) return "radiology_operator";
  if (status.includes("billing") || status === "consultation_completed" || status === "partially_paid") return "cashier";
  if (status === "queued_for_doctor" || status === "with_doctor" || status === "awaiting_doctor_review") return "doctor";
  return "receptionist";
}

function buildVisitTimeline(visit: Visit): TimelineEvent[] {
  return [
    {
      id: `tl-${visit.id}-created`,
      entityType: "visit",
      entityId: visit.id,
      eventType: "create",
      title: "Visit created",
      description: `${visit.patient.fullName} uchun ${visit.visitCode} ochildi.`,
      actor: mockUsers[0],
      createdAt: visit.createdAt,
    },
    {
      id: `tl-${visit.id}-status`,
      entityType: "visit",
      entityId: visit.id,
      eventType: "status_change",
      title: visit.workflowBadge.label,
      actor: mockUsers[4],
      createdAt: visit.updatedAt,
    },
  ];
}
