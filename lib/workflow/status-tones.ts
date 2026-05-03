import type { AppointmentStatus } from "../types/appointments";
import type { InvoiceStatus, PaymentStatus } from "../types/billing";
import type { ConsultationStatus } from "../types/clinical";
import type { LabOrderStatus } from "../types/lab";
import type { ProcedureOrderStatus } from "../types/procedures";
import type { RadiologyOrderStatus } from "../types/radiology";
import type { StatusBadgeData } from "../types/shared";
import type { VisitWorkflowStatus } from "../types/visits";

export type StatusTone = StatusBadgeData["tone"];

export type WorkflowDomain =
  | "visit"
  | "appointment"
  | "consultation"
  | "lab"
  | "radiology"
  | "procedure"
  | "invoice"
  | "payment"
  | "task"
  | "staff"
  | "attendance";

export const DEFAULT_STATUS_TONE: StatusTone = "neutral";

const visitTones: Record<VisitWorkflowStatus, StatusTone> = {
  intake_created: "neutral",
  doctor_assigned: "info",
  queued_for_doctor: "warning",
  with_doctor: "accent",
  awaiting_lab: "warning",
  lab_in_progress: "accent",
  awaiting_radiology: "warning",
  radiology_in_progress: "accent",
  awaiting_procedure: "warning",
  procedure_in_progress: "accent",
  awaiting_doctor_review: "warning",
  consultation_completed: "success",
  billing_pending: "warning",
  partially_paid: "warning",
  paid: "success",
  completed: "success",
  cancelled: "danger",
};

const appointmentTones: Record<AppointmentStatus, StatusTone> = {
  scheduled: "info",
  confirmed: "success",
  arrived: "warning",
  checked_in: "accent",
  converted_to_visit: "success",
  no_show: "danger",
  cancelled: "danger",
};

const consultationTones: Record<ConsultationStatus, StatusTone> = {
  not_started: "neutral",
  in_progress: "accent",
  waiting_for_results: "warning",
  reviewing_results: "warning",
  completed: "success",
  cancelled: "danger",
};

const labTones: Record<LabOrderStatus, StatusTone> = {
  ordered: "neutral",
  sample_pending: "warning",
  sample_collected: "info",
  in_progress: "accent",
  result_entered: "warning",
  verified: "success",
  released: "success",
  reviewed_by_doctor: "success",
  cancelled: "danger",
};

const radiologyTones: Record<RadiologyOrderStatus, StatusTone> = {
  ordered: "neutral",
  scheduled: "info",
  patient_arrived: "warning",
  imaging_in_progress: "accent",
  image_captured: "info",
  report_drafted: "warning",
  report_verified: "success",
  released: "success",
  reviewed_by_doctor: "success",
  cancelled: "danger",
};

const procedureTones: Record<ProcedureOrderStatus, StatusTone> = {
  ordered: "neutral",
  scheduled: "info",
  ready: "warning",
  in_progress: "accent",
  completed: "success",
  reviewed_by_doctor: "success",
  cancelled: "danger",
};

const invoiceTones: Record<InvoiceStatus, StatusTone> = {
  draft: "neutral",
  issued: "warning",
  partially_paid: "warning",
  paid: "success",
  void: "danger",
  refunded: "danger",
  cancelled: "danger",
};

const paymentTones: Record<PaymentStatus, StatusTone> = {
  pending: "warning",
  recorded: "success",
  failed: "danger",
  refunded: "danger",
  cancelled: "danger",
};

const taskTones: Record<string, StatusTone> = {
  open: "warning",
  in_progress: "accent",
  blocked: "danger",
  done: "success",
  cancelled: "danger",
};

const staffTones: Record<string, StatusTone> = {
  active: "success",
  on_leave: "warning",
  suspended: "danger",
  terminated: "danger",
  archived: "neutral",
};

const attendanceTones: Record<string, StatusTone> = {
  present: "success",
  late: "warning",
  absent: "danger",
  on_leave: "info",
  sick_leave: "warning",
  holiday: "neutral",
};

const toneMaps: Record<WorkflowDomain, Record<string, StatusTone>> = {
  visit: visitTones,
  appointment: appointmentTones,
  consultation: consultationTones,
  lab: labTones,
  radiology: radiologyTones,
  procedure: procedureTones,
  invoice: invoiceTones,
  payment: paymentTones,
  task: taskTones,
  staff: staffTones,
  attendance: attendanceTones,
};

export function getStatusTone(domain: WorkflowDomain | string, status: string): StatusTone {
  const tones = toneMaps[domain as WorkflowDomain];
  return tones?.[status] ?? DEFAULT_STATUS_TONE;
}
