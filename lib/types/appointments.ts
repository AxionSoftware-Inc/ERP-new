import type {
  BranchSummary,
  DepartmentSummary,
  DoctorSummary,
  ID,
  NextActionData,
  PatientSummary,
  StatusBadgeData,
} from "./shared";

export type AppointmentStatus =
  | "scheduled"
  | "confirmed"
  | "arrived"
  | "checked_in"
  | "converted_to_visit"
  | "no_show"
  | "cancelled";

export type Appointment = {
  id: ID;
  appointmentCode: string;
  patient: PatientSummary;
  doctor: DoctorSummary;
  department: DepartmentSummary;
  branch: BranchSummary;
  scheduledStart: string;
  scheduledEnd: string;
  status: AppointmentStatus;
  reason?: string | null;
  notes?: string | null;
  linkedVisitId?: ID | null;
  statusBadge: StatusBadgeData;
  nextAction: NextActionData;
  createdAt: string;
  updatedAt: string;
};

export type AppointmentListItem = {
  id: ID;
  appointmentCode: string;
  patient: PatientSummary;
  doctor: DoctorSummary;
  department: DepartmentSummary;
  scheduledStart: string;
  scheduledEnd: string;
  status: AppointmentStatus;
  statusBadge: StatusBadgeData;
  nextAction: NextActionData;
};
