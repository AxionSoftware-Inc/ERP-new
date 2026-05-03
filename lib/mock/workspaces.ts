import type {
  CashierWorkspaceResponse,
  DoctorWorkspaceResponse,
  LabWorkspaceResponse,
  QueueSectionData,
  ReceptionWorkspaceResponse,
} from "../types/workspaces";
import type { InvoiceSummary } from "../types/billing";
import type { LabOrderSummary } from "../types/lab";
import type { VisitListItem } from "../types/visits";
import { mockAppointmentListItems } from "./appointments";
import { mockInvoiceSummaries, mockPayments } from "./billing";
import { mockLabOrderSummaries, mockLabResultSummaries } from "./lab";
import { mockPatientListItems } from "./patients";
import { createMoney } from "./shared";
import { mockVisitListItems } from "./visits";

export const mockReceptionWorkspace: ReceptionWorkspaceResponse = {
  summary: [
    { key: "needs-action", label: "Needs action", count: 2, tone: "warning", href: "/app/reception/queue" },
    { key: "in-progress", label: "In progress", count: 6, tone: "accent" },
    { key: "billing", label: "Billing / closing", count: 4, tone: "info" },
    { key: "closed", label: "Closed today", count: 2, tone: "success" },
  ],
  queues: {
    needsAction: queue("needs-action", "Needs action", mockVisitListItems.filter((visit) => ["intake_created", "doctor_assigned"].includes(visit.workflowStatus))),
    inProgress: queue(
      "in-progress",
      "In progress",
      mockVisitListItems.filter((visit) =>
        [
          "queued_for_doctor",
          "with_doctor",
          "awaiting_lab",
          "lab_in_progress",
          "awaiting_radiology",
          "radiology_in_progress",
          "awaiting_doctor_review",
        ].includes(visit.workflowStatus),
      ),
    ),
    billingAndClosing: queue(
      "billing-closing",
      "Billing / closing",
      mockVisitListItems.filter((visit) => ["consultation_completed", "billing_pending", "partially_paid", "paid"].includes(visit.workflowStatus)),
    ),
    closedToday: queue("closed", "Closed today", mockVisitListItems.filter((visit) => ["completed", "cancelled"].includes(visit.workflowStatus))),
  },
  rightPanel: {
    todayAppointments: mockAppointmentListItems.slice(0, 5),
    recentRegistrations: mockPatientListItems.slice(0, 5),
    delayedCases: mockVisitListItems.filter((visit) => ["awaiting_lab", "billing_pending", "partially_paid"].includes(visit.workflowStatus)),
  },
};

export const mockDoctorWorkspace: DoctorWorkspaceResponse = {
  summary: [
    { key: "my-queue", label: "My queue", count: 1, tone: "warning" },
    { key: "active", label: "Active encounters", count: 1, tone: "accent" },
    { key: "review", label: "Needs review", count: 1, tone: "warning" },
    { key: "completed", label: "Completed today", count: 2, tone: "success" },
  ],
  queues: {
    myQueue: queue("my-queue", "My queue", mockVisitListItems.filter((visit) => visit.workflowStatus === "queued_for_doctor")),
    activeEncounters: queue("active", "Active encounters", mockVisitListItems.filter((visit) => visit.workflowStatus === "with_doctor")),
    needsReview: queue("review", "Needs review", mockVisitListItems.filter((visit) => visit.workflowStatus === "awaiting_doctor_review")),
    completedToday: queue(
      "completed",
      "Completed today",
      mockVisitListItems.filter((visit) => ["consultation_completed", "completed"].includes(visit.workflowStatus)),
    ),
  },
  rightPanel: {
    todayAppointments: mockAppointmentListItems.filter((appointment) => ["confirmed", "arrived"].includes(appointment.status)),
    urgentCases: mockVisitListItems.filter((visit) => visit.workflowStatus === "awaiting_doctor_review"),
    recentResults: mockLabResultSummaries,
  },
};

export const mockLabWorkspace: LabWorkspaceResponse = {
  summary: [
    { key: "sample", label: "Sample collection", count: 2, tone: "warning" },
    { key: "processing", label: "Processing", count: 2, tone: "accent" },
    { key: "entry", label: "Result entry", count: 1, tone: "warning" },
    { key: "released", label: "Released", count: 2, tone: "success" },
  ],
  queues: {
    sampleCollection: labQueue("sample", "Sample collection", mockLabOrderSummaries.filter((order) => ["ordered", "sample_pending"].includes(order.status))),
    processing: labQueue("processing", "Processing", mockLabOrderSummaries.filter((order) => ["sample_collected", "in_progress"].includes(order.status))),
    resultEntry: labQueue("entry", "Result entry", mockLabOrderSummaries.filter((order) => order.status === "result_entered")),
    verification: labQueue("verification", "Verification", mockLabOrderSummaries.filter((order) => order.status === "result_entered")),
    released: labQueue("released", "Released", mockLabOrderSummaries.filter((order) => ["verified", "released"].includes(order.status))),
  },
  rightPanel: {
    urgentTests: mockLabOrderSummaries.filter((order) => order.priority !== "routine"),
    delayedSamples: mockLabOrderSummaries.filter((order) => order.status === "sample_pending"),
    equipmentWarnings: ["Biochemistry analyzer calibration due at 16:00"],
    reagentWarnings: ["CBC reagent below reorder point"],
  },
};

export const mockCashierWorkspace: CashierWorkspaceResponse = {
  summary: [
    { key: "needs-billing", label: "Needs billing", count: 1, tone: "warning" },
    { key: "awaiting", label: "Awaiting payment", count: 2, tone: "warning" },
    { key: "partial", label: "Partial payments", count: 1, tone: "warning" },
    { key: "settled", label: "Settled today", count: 1, tone: "success" },
  ],
  queues: {
    needsBillingAction: invoiceQueue("needs-billing", "Needs billing action", mockInvoiceSummaries.filter((invoice) => invoice.status === "draft")),
    awaitingPayment: invoiceQueue("awaiting", "Awaiting payment", mockInvoiceSummaries.filter((invoice) => invoice.status === "issued")),
    partialPayments: invoiceQueue("partial", "Partial payments", mockInvoiceSummaries.filter((invoice) => invoice.status === "partially_paid")),
    settledToday: invoiceQueue("settled", "Settled today", mockInvoiceSummaries.filter((invoice) => invoice.status === "paid")),
    voidOrCancelled: invoiceQueue(
      "void-cancelled",
      "Void / cancelled",
      mockInvoiceSummaries.filter((invoice) => ["void", "refunded", "cancelled"].includes(invoice.status)),
    ),
  },
  rightPanel: {
    shiftTotal: createMoney(2450000),
    cashTotal: createMoney(980000),
    cardTotal: createMoney(1470000),
    recentPayments: mockPayments.slice(0, 5),
    highPriorityUnpaid: mockInvoiceSummaries.filter((invoice) => ["issued", "partially_paid"].includes(invoice.status)),
  },
};

function queue(key: string, title: string, items: VisitListItem[]): QueueSectionData<VisitListItem> {
  return { key, title, count: items.length, items };
}

function labQueue(key: string, title: string, items: LabOrderSummary[]): QueueSectionData<LabOrderSummary> {
  return { key, title, count: items.length, items };
}

function invoiceQueue(key: string, title: string, items: InvoiceSummary[]): QueueSectionData<InvoiceSummary> {
  return { key, title, count: items.length, items };
}
