import type { InvoiceStatus, InvoiceSummary } from "./billing";
import type { Consultation } from "./clinical";
import type { DocumentSummary } from "./documents";
import type { LabOrderSummary } from "./lab";
import type { ProcedureOrderSummary } from "./procedures";
import type { RadiologyOrderSummary } from "./radiology";
import type {
  BranchSummary,
  DepartmentSummary,
  DoctorSummary,
  ID,
  NextActionData,
  PatientSummary,
  StatusBadgeData,
  TimelineEvent,
  UserSummary,
} from "./shared";

export type VisitWorkflowStatus =
  | "intake_created"
  | "doctor_assigned"
  | "queued_for_doctor"
  | "with_doctor"
  | "awaiting_lab"
  | "lab_in_progress"
  | "awaiting_radiology"
  | "radiology_in_progress"
  | "awaiting_procedure"
  | "procedure_in_progress"
  | "awaiting_doctor_review"
  | "consultation_completed"
  | "billing_pending"
  | "partially_paid"
  | "paid"
  | "completed"
  | "cancelled";

export type VisitType = "walk_in" | "appointment" | "follow_up" | "emergency";

export type VisitSummary = {
  id: ID;
  visitCode: string;
  patient: PatientSummary;
  doctor?: DoctorSummary | null;
  department?: DepartmentSummary | null;
  workflowStatus: VisitWorkflowStatus;
  workflowBadge: StatusBadgeData;
  nextAction: NextActionData;
  createdAt: string;
};

export type VisitListItem = {
  id: ID;
  visitCode: string;
  patient: PatientSummary;
  doctor?: DoctorSummary | null;
  department?: DepartmentSummary | null;
  reason?: string | null;
  workflowStatus: VisitWorkflowStatus;
  workflowBadge: StatusBadgeData;
  nextAction: NextActionData;
  invoiceStatus?: InvoiceStatus | null;
  invoiceBadge?: StatusBadgeData | null;
  createdAt: string;
  updatedAt: string;
};

export type VisitDetailResponse = {
  visit: Visit;
  consultation?: Consultation | null;
  labOrders: LabOrderSummary[];
  radiologyOrders: RadiologyOrderSummary[];
  procedureOrders: ProcedureOrderSummary[];
  invoice?: InvoiceSummary | null;
  documents: DocumentSummary[];
  timeline: TimelineEvent[];
};

export type Visit = {
  id: ID;
  visitCode: string;
  patient: PatientSummary;
  branch: BranchSummary;
  department?: DepartmentSummary | null;
  doctor?: DoctorSummary | null;
  reason?: string | null;
  visitType: VisitType;
  workflowStatus: VisitWorkflowStatus;
  workflowBadge: StatusBadgeData;
  nextAction: NextActionData;
  appointmentId?: ID | null;
  createdBy?: UserSummary | null;
  createdAt: string;
  updatedAt: string;
};
