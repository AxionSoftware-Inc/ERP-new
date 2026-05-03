import type { LabOrder, LabOrderDetailResponse, LabOrderStatus, LabResult, LabResultSummary } from "../types/lab";
import type { TimelineEvent } from "../types/shared";
import { getLabNextAction, getLabStatusBadge } from "../workflow/lab-workflow";
import { mockPatients } from "./patients";
import { mockDoctors, mockUsers, daysAgo, hoursAgo } from "./shared";

const labStatuses: LabOrderStatus[] = [
  "ordered",
  "sample_pending",
  "sample_collected",
  "in_progress",
  "result_entered",
  "verified",
  "released",
  "reviewed_by_doctor",
  "cancelled",
];

export const mockLabOrders: LabOrder[] = labStatuses.map((status, index) => {
  const id = `lab-${String(index + 1).padStart(3, "0")}`;
  const hasSample = !["ordered", "sample_pending", "cancelled"].includes(status);
  const hasResult = ["result_entered", "verified", "released", "reviewed_by_doctor"].includes(status);
  const result = hasResult ? buildLabResult(index, status) : null;
  const order = {
    id,
    labOrderCode: `L-2026-${String(index + 1).padStart(4, "0")}`,
    visitId: `visit-${String(Math.min(index + 1, 8)).padStart(3, "0")}`,
    patient: mockPatients[index % mockPatients.length],
    requestedBy: mockDoctors[index % 4],
    status,
    statusBadge: getLabStatusBadge(status),
    nextAction: { label: "View", cta: "View" },
    priority: index === 3 ? "stat" : index % 3 === 0 ? "urgent" : "routine",
    tests: [
      {
        id: `lab-item-${index + 1}`,
        testCode: index % 2 === 0 ? "CBC" : "GLU",
        testName: index % 2 === 0 ? "Complete Blood Count" : "Fasting Glucose",
        category: index % 2 === 0 ? "Hematology" : "Biochemistry",
        status,
        result,
      },
    ],
    sample: hasSample
      ? {
          id: `sample-${index + 1}`,
          sampleCode: `S-2026-${String(index + 1).padStart(4, "0")}`,
          sampleType: "Blood",
          collectedAt: hoursAgo(index + 2),
          collectedBy: mockUsers[1],
        }
      : null,
    notes: index % 2 === 0 ? "Morning sample preferred." : null,
    createdAt: daysAgo(index % 3, 8 + index),
    updatedAt: hoursAgo(index + 1),
  } satisfies LabOrder;
  return { ...order, nextAction: getLabNextAction(order, status === "result_entered" ? "lab_verifier" : "lab_operator") };
});

export const mockLabOrderSummaries = mockLabOrders.map((order) => ({
  id: order.id,
  labOrderCode: order.labOrderCode,
  visitId: order.visitId,
  patient: order.patient,
  requestedBy: order.requestedBy,
  status: order.status,
  statusBadge: order.statusBadge,
  nextAction: order.nextAction,
  priority: order.priority,
  testNames: order.tests.map((test) => test.testName),
  createdAt: order.createdAt,
}));

export const mockLabResultSummaries: LabResultSummary[] = mockLabOrders
  .filter((order) => ["released", "reviewed_by_doctor"].includes(order.status))
  .map((order) => ({
    id: `res-summary-${order.id}`,
    labOrderCode: order.labOrderCode,
    testNames: order.tests.map((test) => test.testName),
    status: order.status,
    statusBadge: order.statusBadge,
    releasedAt: order.updatedAt,
  }));

export function getMockLabOrderById(id: string): LabOrder | undefined {
  return mockLabOrders.find((order) => order.id === id);
}

export function getMockLabOrderDetail(id: string): LabOrderDetailResponse | undefined {
  const order = getMockLabOrderById(id);
  if (!order) return undefined;
  return {
    order,
    results: order.tests.flatMap((test) => (test.result ? [test.result] : [])),
    timeline: buildLabTimeline(order),
  };
}

export function getMockLabOrderSummariesByVisitId(visitId: string) {
  return mockLabOrderSummaries.filter((order) => order.visitId === visitId);
}

function buildLabResult(index: number, status: LabOrderStatus): LabResult {
  return {
    id: `lab-result-${index + 1}`,
    testCode: index % 2 === 0 ? "CBC" : "GLU",
    testName: index % 2 === 0 ? "Complete Blood Count" : "Fasting Glucose",
    value: index % 2 === 0 ? "WBC 6.2" : 6.8,
    unit: index % 2 === 0 ? "10^9/L" : "mmol/L",
    referenceRange: index % 2 === 0 ? "4.0-10.0" : "3.9-5.5",
    flag: status === "result_entered" ? "high" : "normal",
    enteredBy: mockUsers[1],
    verifiedBy: ["verified", "released", "reviewed_by_doctor"].includes(status) ? mockUsers[2] : null,
    enteredAt: hoursAgo(index + 1),
    verifiedAt: ["verified", "released", "reviewed_by_doctor"].includes(status) ? hoursAgo(index) : null,
  };
}

function buildLabTimeline(order: LabOrder): TimelineEvent[] {
  return [
    {
      id: `tl-${order.id}-created`,
      entityType: "lab_order",
      entityId: order.id,
      eventType: "create",
      title: "Lab order created",
      actor: mockUsers[1],
      createdAt: order.createdAt,
    },
    {
      id: `tl-${order.id}-status`,
      entityType: "lab_order",
      entityId: order.id,
      eventType: "status_change",
      title: order.statusBadge.label,
      actor: mockUsers[1],
      createdAt: order.updatedAt,
    },
  ];
}
