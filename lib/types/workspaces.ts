import type { AppointmentListItem } from "./appointments";
import type { InvoiceSummary, Payment } from "./billing";
import type { LabOrderSummary, LabResultSummary } from "./lab";
import type { PatientListItem } from "./patients";
import type { Money, StatusTone } from "./shared";
import type { VisitListItem } from "./visits";

export type WorkspaceSummaryItem = {
  key: string;
  label: string;
  count: number;
  tone?: StatusTone;
  href?: string;
};

export type QueueSectionData<T> = {
  key: string;
  title: string;
  description?: string;
  count: number;
  items: T[];
};

export type ReceptionWorkspaceResponse = {
  summary: WorkspaceSummaryItem[];
  queues: {
    needsAction: QueueSectionData<VisitListItem>;
    inProgress: QueueSectionData<VisitListItem>;
    billingAndClosing: QueueSectionData<VisitListItem>;
    closedToday: QueueSectionData<VisitListItem>;
  };
  rightPanel: {
    todayAppointments: AppointmentListItem[];
    recentRegistrations: PatientListItem[];
    delayedCases: VisitListItem[];
  };
};

export type DoctorWorkspaceResponse = {
  summary: WorkspaceSummaryItem[];
  queues: {
    myQueue: QueueSectionData<VisitListItem>;
    activeEncounters: QueueSectionData<VisitListItem>;
    needsReview: QueueSectionData<VisitListItem>;
    completedToday: QueueSectionData<VisitListItem>;
  };
  rightPanel: {
    todayAppointments: AppointmentListItem[];
    urgentCases: VisitListItem[];
    recentResults: LabResultSummary[];
  };
};

export type LabWorkspaceResponse = {
  summary: WorkspaceSummaryItem[];
  queues: {
    sampleCollection: QueueSectionData<LabOrderSummary>;
    processing: QueueSectionData<LabOrderSummary>;
    resultEntry: QueueSectionData<LabOrderSummary>;
    verification: QueueSectionData<LabOrderSummary>;
    released: QueueSectionData<LabOrderSummary>;
  };
  rightPanel: {
    urgentTests: LabOrderSummary[];
    delayedSamples: LabOrderSummary[];
    equipmentWarnings: string[];
    reagentWarnings: string[];
  };
};

export type CashierWorkspaceResponse = {
  summary: WorkspaceSummaryItem[];
  queues: {
    needsBillingAction: QueueSectionData<InvoiceSummary>;
    awaitingPayment: QueueSectionData<InvoiceSummary>;
    partialPayments: QueueSectionData<InvoiceSummary>;
    settledToday: QueueSectionData<InvoiceSummary>;
    voidOrCancelled: QueueSectionData<InvoiceSummary>;
  };
  rightPanel: {
    shiftTotal: Money;
    cashTotal: Money;
    cardTotal: Money;
    recentPayments: Payment[];
    highPriorityUnpaid: InvoiceSummary[];
  };
};
