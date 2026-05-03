import type { RadiologyOrder, RadiologyOrderStatus } from "../types/radiology";
import { getRadiologyNextAction, getRadiologyStatusBadge } from "../workflow/radiology-workflow";
import { getMockDocumentsForVisit } from "./documents";
import { mockPatients } from "./patients";
import { mockDoctors, mockUsers, daysAgo, hoursAgo } from "./shared";

const radiologyStatuses: RadiologyOrderStatus[] = [
  "ordered",
  "scheduled",
  "patient_arrived",
  "imaging_in_progress",
  "image_captured",
  "report_drafted",
  "report_verified",
  "released",
  "reviewed_by_doctor",
];

export const mockRadiologyOrders: RadiologyOrder[] = radiologyStatuses.map((status, index) => {
  const order = {
    id: `rad-${String(index + 1).padStart(3, "0")}`,
    radiologyOrderCode: `R-2026-${String(index + 1).padStart(4, "0")}`,
    visitId: `visit-${String(Math.min(index + 1, 8)).padStart(3, "0")}`,
    patient: mockPatients[index % mockPatients.length],
    requestedBy: mockDoctors[index % 4],
    serviceName: index % 2 === 0 ? "Chest X-ray" : "Abdominal ultrasound",
    status,
    statusBadge: getRadiologyStatusBadge(status),
    nextAction: { label: "View", cta: "View" },
    clinicalIndication: index % 2 === 0 ? "Chest discomfort" : "Abdominal pain",
    scheduledAt: daysAgo(index % 2, 10 + index),
    report: ["report_drafted", "report_verified", "released", "reviewed_by_doctor"].includes(status)
      ? {
          id: `rad-report-${index + 1}`,
          findings: "No acute abnormality detected.",
          impression: "Routine follow-up recommended.",
          draftedBy: mockUsers[4],
          verifiedBy: ["report_verified", "released", "reviewed_by_doctor"].includes(status) ? mockUsers[4] : null,
          draftedAt: hoursAgo(index + 1),
          verifiedAt: ["report_verified", "released", "reviewed_by_doctor"].includes(status) ? hoursAgo(index) : null,
        }
      : null,
    attachments: getMockDocumentsForVisit(`visit-${String(Math.min(index + 1, 8)).padStart(3, "0")}`),
    createdAt: daysAgo(index % 3, 9 + index),
    updatedAt: hoursAgo(index + 1),
  } satisfies RadiologyOrder;
  const role = ["image_captured", "report_drafted"].includes(status) ? "radiologist" : "radiology_operator";
  return { ...order, nextAction: getRadiologyNextAction(order, role) };
});

export const mockRadiologyOrderSummaries = mockRadiologyOrders.map((order) => ({
  id: order.id,
  radiologyOrderCode: order.radiologyOrderCode,
  visitId: order.visitId,
  patient: order.patient,
  requestedBy: order.requestedBy,
  serviceName: order.serviceName,
  status: order.status,
  statusBadge: order.statusBadge,
  nextAction: order.nextAction,
  scheduledAt: order.scheduledAt,
  createdAt: order.createdAt,
}));

export function getMockRadiologyOrderById(id: string): RadiologyOrder | undefined {
  return mockRadiologyOrders.find((order) => order.id === id);
}

export function getMockRadiologyOrderSummariesByVisitId(visitId: string) {
  return mockRadiologyOrderSummaries.filter((order) => order.visitId === visitId);
}
